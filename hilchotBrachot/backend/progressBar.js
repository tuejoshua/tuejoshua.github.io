/*
Usage:

1. Put the following DIV element in your code:
<div id="progressBarDiv" style="width: 0%; height: 18px; background-color: green; position: fixed" onClick="progressBar_click();"></div>
- where all values can be adjusted as needed, besides the onClick parameter
("position: fixed" ensures that the progress bar is ALWAYS visible, regardless of scrolling)

1b. If you changed the DIV "id" parameter from the value listed above, also adjust the following (global) parameter accordingly, e.g.:
progressBarDivId = 'newDivId';

2. Call these functions in your code if/where applicable:
progressBar_setWaitTime(n);
progressBar_startCountdown();
progressBar_skipToPaused();
progressBar_click();

NB: In case you create event handlers on multiple levels of the DOM tree - e.g. like so...
	document.body.onclick = progressBar_click;
... then you probably want to stop propagation of the event from the DIV and to parent elements
(so one event will not effects on many levels at once) - like so:
	event.stopPropagation();

*/

// Initialize GLOBALS(!)
var ProgressBarWidth = 0; // %
var waitTimeBeforeNewQuestion = 2500; // ms
var progressBarInterval; // global so that we can clear it (i.e. interrupt the progress bar) from elsewhere
var progressBarState = 0; // 0 = progressBar is not running / should not be visible/clickable yet, nothing will happen; 1 = stop (running) progress bar; 2 = (progress bar was interrupted,) reload page straight away
var progressBarDivId = 'progressBarDiv'; // id of DIV element

function progressBar_setWaitTime(newTime) {
	waitTimeBeforeNewQuestion = newTime;
}

function progressBar_startCountdown() {
	progressBarState = 1; // See comment at declaration of this variable (above)
	document.getElementById(progressBarDivId).innerHTML = 'Press anywhere or any key to pause game';
	progressBarInterval = setInterval(updateProgressBar, waitTimeBeforeNewQuestion/100); // 100 1% increments
}

function progressBar_skipToPaused() {
	// Use progress bar to inform user about state
	progressBarState = 2; // See comment at declaration of this variable (above)
	document.getElementById(progressBarDivId).innerHTML = 'Press anywhere or any key to continue game';
	document.getElementById(progressBarDivId).style.width = '100%';
	document.getElementById(progressBarDivId).style.backgroundColor = 'red';
}

function updateProgressBar() {
	if (ProgressBarWidth < 100) { // This condition is necessary at least for Chrome on Lenovo tablet, for which it was found that the location.reload() call below is asynchronous and so slow that this block of code will continue to run, resizing the progress bar way above 100%, resulting in wierd GUI behavior (page zooming out)
		ProgressBarWidth++;
		document.getElementById(progressBarDivId).style.width = ProgressBarWidth + '%';
		if (ProgressBarWidth == 100) { //... as a continuation of the comment above, it was probably the resulting ~300 repetitions of the location.reload() call below which stalled the browser - hence the need for THIS condition also ;-)
			location.reload();
		}
	}
}

function progressBar_click(event) {

	event.stopPropagation(); // Prevent the ONCLICK event to Bubble up to the BODY element and trigger his ONCLICK event handler also

	switch (progressBarState) { // See comment at progressBarState declaration (above)
		case 0:
			break;
		case 1:
			clearInterval(progressBarInterval);
			document.getElementById(progressBarDivId).innerHTML = 'Game paused by user - click anywhere or any key to continue';
			document.getElementById(progressBarDivId).style.backgroundColor = 'blue';
			document.getElementById(progressBarDivId).style.width = '100%';
			progressBarState++;
			break;
		case 2:
			location.reload();
			progressBarState++;
			break;
		default:
			window.alert('ERROR [in SWITCH in progressBarClick(): progressBarState = ' + progressBarState);
	}
}
