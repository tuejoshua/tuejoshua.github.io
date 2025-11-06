// Import Markdown parser as ES module
//... for this to work, this (.js) file must itself be included (by calling .html file as such a module (i.e. "<script type=module>")
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

function getTechLogo(tag) {
	let logoUrl;
	switch(tag) {
		case 'Bash':
			logoUrl = '256x256 (Bash logo from github.com-odb).png';
			break;
		case 'front-end':
			logoUrl = 'front-end-logo-color (from github.com-shannonmoeller).png';
			break;
		case 'JSON':
			logoUrl = 'JSON_vector_logo.svg (from Wikimedia Commons).png';
			break;
		case 'Markdown':
			logoUrl = 'markdown-mark (from github.com-dcurtis-markdown-mark).svg';
			break;
		case 'PHP':
			logoUrl = 'new-php-logo (from php.net).png';
			break;
		case 'Python':
			logoUrl = 'python-logo-only (from python.org).png';
			break;
		default:
			console.error('logo not found for "' + tag + '"');
			return '';
	}
	// In order to improve readability of when selecting the image as part of text (which will include the alt text), delimited by []s
	return '<img alt="[' + tag + ' icon]" src="resources/' + logoUrl + '" height=40 title="' + tag + '.\nFor source and license of this icon, see further down this page">';
}

function showProjectCard(btn) {
	const card = document.getElementById('projectCard' + btn.dataset.index); // DATA-INDEX parameter);
	const isVisible = card.style.display === 'block';
	card.style.display = isVisible? 'none' : 'block';
	const titleCell = btn.querySelector('.project-title-cell');
	const currentText = titleCell.textContent;
	// Replace just the first character (icon) with ▶ or ▼
	titleCell.textContent = (isVisible ? '▶' : '▼') + currentText.slice(1);
}

/* The following is based on an example on https://www.w3schools.com/jsref/api_fetch.asp
...yes, previously using a "new XMLHttpRequest()"
...and of course, one COULD just use React, by it seems I'm still a bit of a DIY fanatic
*/

export async function displayProjectCards(file) {

	const projectsJsonObject = await fetch(file);
	const projects = await projectsJsonObject.json();

	let domString = '<div style="text-align: right;">(Click to expand)</div>';

	for (let i=0; i<projects.length; i++) {

		// ONCLICK is obsolete - and breaks with MODULE code => CLASS + DATA-* + event listener elsewhere...
		domString += '<button type="button" class="ProjectButton" data-index="' + i + '">' +
			'<table style="width: 100%; border-collapse: collapse;"><tr><td class="project-title-cell" style="border: none; text-align: left; font-size: 1.3em;">' + '▶ ' + projects[i].title + '</td><td style="text-align: right; border: none;">';

		for (let tag of projects[i].technologies) {
				domString += ' ' + getTechLogo(tag);
		}

	/// PROJECT DESCRIPTION FROM MARKDOWN FILE

		// max-width because width does not include the padding that were also applying
		domString += '</td></tr></table></button>' +
			'<div id="projectCard' + i + '" class="markdown-content">';

		// Read assumed Markdown file; alert if problem
		// projects[i].title + '.md'
		// Error handling based on chatGPT suggestion
		try	{
			let mdFileObject = await fetch(projects[i].title + '.md');
			if (!mdFileObject.ok) { // fetch does not throw catchable error itself
				throw new Error(`HTTP error! status: ${mdFileObject.status}`);
			}
			let mdContent = await mdFileObject.text();
			domString += marked.parse(mdContent);
		}
		catch (error) {

			/* To be re-enabled once we are ready to remove the fallback functionality below - and together with removing these 3 fields from the JSON:
			domString += '<p style="color:red;"><em>Could not load project description from file ' + projects[i].title + '.md:<br>' + error + '</em></p>';
			*/

			// FALLBACK:
			let motivationString = projects[i].motivation.trim(); if (motivationString !== '') { motivationString = '<b>motivation:</b><br>' + motivationString; }
			let summaryString    = projects[i].summary.trim();	  if (summaryString    !== '') {	summaryString = '<b>summary: </b><br>'   + summaryString;	 }
			let detailsString    = projects[i].details.trim();    if (detailsString    !== '') {	detailsString = '<b>details: </b><br>'   + detailsString;    }
			domString += motivationString + '<p>' + summaryString + '<p>' + detailsString;

		}

		domString += '</div>';

    }

    // Write HTML DOM string to DIV element
    document.getElementById('showData').innerHTML = domString;

	// OnClick events (see ONCLICK comment above)
	document.querySelectorAll('.ProjectButton').forEach(btn => { // all CLASS = ProjectButton

		/* Since we enabled selection of project titles / button labels (via CSS; see projects.html),
		   we want to NOT fire the click event if text is being selected - therefore, replace this

		   btn.addEventListener('click', () => {
			showProjectCard(btn);
		});

			with this: */

		let mouseMoved = false;

		btn.addEventListener('mousedown', () => {
  			mouseMoved = false;
		});

		btn.addEventListener('mousemove', () => {
			mouseMoved = true;
		});

		btn.addEventListener('mouseup', () => {
			if (!mouseMoved) {
    			showProjectCard(btn);
  			}
		});

	});


}