function getTechLogo(tag) {
	switch(tag) {
		case 'FrontEnd':
			logoUrl = 'front-end-logo-color (from github.com-shannonmoeller).png';
			licenseLink = 'github.com/shannonmoeller/front-end-logo';
			altText = 'Front End';
			break;
		case 'JSON':
			logoUrl = 'JSON_vector_logo.svg (from Wikimedia Commons).png';
			licenseLink = 'commons.wikimedia.org/wiki/File:JSON_vector_logo.svg';
			altText = 'JSON';

			break;
		case 'PHP':
			logoUrl = 'new-php-logo (from php.net).png';
			licenseLink = 'www.php.net/download-logos.php';
			altText = 'PHP';
			break;
		case 'Python':
			logoUrl = 'python-logo-only (from python.org).png';
			licenseLink = 'www.python.org/community/logos/';
			altText = 'Python';
			break;
		default:
			alert('logo not found for "' + tag + '"');
			return '';
	}
	return linkMacroString(licenseLink, '<img alt="' + altText + ' icon" src="resources/' + logoUrl + '" height=40 title="' + altText + '.\nClick to see license for this icon">');
}

function showProjectCard(i) {
	switch (document.getElementById('projectCard' + i).style.display) {
		case 'none':
			document.getElementById('projectCard' + i).style.display = 'block';
			break;
		case 'block':
		document.getElementById('projectCard' + i).style.display = 'none';
	}
}

/* The following is based on an example on https://www.w3schools.com/jsref/api_fetch.asp
...yes, previously using a "new XMLHttpRequest()"
...and of course, one COULD just use React, by it seems I'm still a bit of a DIY fanatic
*/

async function displayContentsOfJson(file) {

	let myObject = await fetch(file);
	let projects = await myObject.json();
  
	var domString = '';
     
	for (i=0; i<projects.length; i++) {
		
		fontSizeParam = 'font-size: 1.3em';
		
		// adding "max-height: 999999px;" style to button element, as per suggestion from chatGPT to fix problem I'm seeing specifically in Chrome for Android
		// also, without forcing "text-align: left" here (as should be the default), many browsers use "justify" instead (which I dislike)
		domString += '<button type="button" style="width: 100%; text-align: left; style="max-height: 999999px;" onclick="showProjectCard(' + i + ');">' +
			'<table style="width: 100%; border-collapse: collapse;"><tr><td style="border: none; text-align: left; ' + fontSizeParam + '">' + projects[i].title + '</td><td style="text-align: right; border: none;">';
			
		for (let tag of projects[i].technologies) {
				domString += getTechLogo(tag);
		}
		
		motivationString = projects[i].motivation.trim();
		if (motivationString !== '') {
			motivationString = '<b>motivation:</b><br>' + motivationString;
		}
		
		summaryString = projects[i].summary.trim();
		if (summaryString !== '') {
			summaryString = '<b>summary: </b><br>' + summaryString;
		}

		detailsString = projects[i].details.trim();
		if (detailsString !== '') {
			detailsString = '<b>details: </b><br>' + detailsString;
		}
		
		domString += '</td></tr></table></button>' +
			'<div id="projectCard' + i + '" style="width: 100%;display: none;border-left-style: dotted;padding: 15px;">' + motivationString + '<p>' + summaryString + '<p>' + detailsString + '</div>';						
    }
            
    // Write HTML DOM string to DIV element
    document.getElementById('showData').innerHTML = domString;
		
}