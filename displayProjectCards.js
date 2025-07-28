// Import Markdown parser as ES module
//... for this to work, this (.js) file must itself be included (by calling .html file as such a module (i.e. "<script type=module>")
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

function getTechLogo(tag) {
	let logoUrl, altText;
	switch(tag) {
		case 'FrontEnd':
			logoUrl = 'front-end-logo-color (from github.com-shannonmoeller).png';
			//licenseLink = 'github.com/shannonmoeller/front-end-logo';
			altText = 'Front End';
			break;
		case 'JSON':
			logoUrl = 'JSON_vector_logo.svg (from Wikimedia Commons).png';
			//licenseLink = 'commons.wikimedia.org/wiki/File:JSON_vector_logo.svg';
			altText = 'JSON';
			break;
		case 'PHP':
			logoUrl = 'new-php-logo (from php.net).png';
			//licenseLink = 'www.php.net/download-logos.php';
			altText = 'PHP';
			break;
		case 'Python':
			logoUrl = 'python-logo-only (from python.org).png';
			//licenseLink = 'www.python.org/community/logos/';
			altText = 'Python';
			break;
		default:
			alert('logo not found for "' + tag + '"');
			return '';
	}
	return '<img alt="' + altText + ' icon" src="resources/' + logoUrl + '" height=40 title="' + altText + '.\nFor source and license of this icon, see further down this page">';
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
  
	let domString = '';
     
	for (let i=0; i<projects.length; i++) {
		
		const fontSizeParam = 'font-size: 1.3em';
		
		// ONCLICK is obsolete - and breaks with MODULE code => CLASS + DATA-* + event listener elsewhere...
		domString += '<button type="button" class="ProjectButton" data-index="' + i + '">' +
			'<table style="width: 100%; border-collapse: collapse;"><tr><td class="project-title-cell" style="border: none; text-align: left; ' + fontSizeParam + '">' + '▶ ' + projects[i].title + '</td><td style="text-align: right; border: none;">';
			
		for (let tag of projects[i].technologies) {
				domString += getTechLogo(tag);
		}
		
	/// PROJECT DESCRIPTION FROM MARKDOWN FILE

		// max-width because width does not include the padding that were also applying
		domString += '</td></tr></table></button>' +
			'<div id="projectCard' + i + '" style="max-width: 100%; display: none; border-left-style: dotted; padding: 15px;">';

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
    
	// DEBUG
	console.log(domString);
	
    // Write HTML DOM string to DIV element
    document.getElementById('showData').innerHTML = domString;
	
	// OnClick events (see ONCLICK comment above)
	document.querySelectorAll('.ProjectButton').forEach(btn => { // all CLASS = ProjectButton
		btn.addEventListener('click', () => {
			showProjectCard(btn);
		});
	});

	
}