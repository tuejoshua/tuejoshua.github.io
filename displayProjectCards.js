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

export async function displayProjectCards(file) {

	const projectsJsonObject = await fetch(file);
	const projects = await projectsJsonObject.json();
  
	let domString = '';
     
	for (let i=0; i<projects.length; i++) {
		
		const fontSizeParam = 'font-size: 1.3em';
		
		// adding "max-height: 999999px;" style to button element, as per suggestion from chatGPT to fix problem I'm seeing specifically in Chrome for Android
		// also, without forcing "text-align: left" here (as should be the default), many browsers use "justify" instead (which I dislike)
		// ...
		// ONCLICK is obsolete - and breaks with MODULE code => CLASS + DATA-* + event listener elsewhere...
		domString += '<button type="button" class="ProjectButton" data-index="' + i + '" style="width: 100%; text-align: left; style="max-height: 999999px;">' +
			'<table style="width: 100%; border-collapse: collapse;"><tr><td style="border: none; text-align: left; ' + fontSizeParam + '">' + projects[i].title + '</td><td style="text-align: right; border: none;">';
			
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
			domString += '<p style="color:red;"><em>Could not load project description from file ' + projects[i].title + '.md:<br>' + error + '</em></p>';
		}
		
		domString += '</div>';
				
		/*
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

			motivationString + '<p>' + summaryString + '<p>' + detailsString 
			
		*/
				
    }
            
    // Write HTML DOM string to DIV element
    document.getElementById('showData').innerHTML = domString;
	
	// OnClick events (see ONCLICK comment above)
	document.querySelectorAll('.ProjectButton').forEach(btn => { // all CLASS = ProjectButton
		btn.addEventListener('click', () => {
			const i = btn.dataset.index; // DATA-INDEX parameter
			showProjectCard(i);
		});
	});

	
}