function getTechLogo(tag) {
	switch(tag) {
		case 'FrontEnd':
			logoUrl = 'front-end-logo-color (from github.com-shannonmoeller).png';
			licenseLink = 'https://github.com/shannonmoeller/front-end-logo';
			break;
		case 'PHP':
			logoUrl = 'new-php-logo (from php.net).png';
			licenseLink = 'https://www.php.net/download-logos.php';
			break;
		case 'Python':
			logoUrl = 'python-logo-only (from python.org).png';
			licenseLink = 'https://www.python.org/community/logos/';
			break;
		default:
			alert('logo not found for "' + tag + '"');
			return '';
	}
	return '<a href="' + licenseLink + '"><img src="resources/' + logoUrl + '" height=40></a>'; 
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

// TEMPORARY: Testing font sizes
switch (i)
			case 1:
				fontSizeParam = 'font-size: 100%';
				break;
			case 2:
				fontSizeParam = 'font-size: 200%';
				break;
			case 3:
				fontSizeParam = 'font-size: 1em';
				break;
			case 4:
				fontSizeParam = 'font-size: 2em';
				break;					
			default:
				fontSizeParam = ''; // i.e. default			
		}
					
		domString += '<button type="button" style="width: 100%;text-align: left;" onclick="showProjectCard(' + i + ');">' +
			'<table style="width: 100%; border-collapse: collapse;"><tr><td style="border: none; ' + fontSizeParam + '">' + projects[i].title + fontSizeParam + '</td><td style="text-align: right; border: none;">';
					
		for (let tag of projects[i].technologies) {
				domString += getTechLogo(tag);
		}
		
		domString += '</td></tr></table></button>' +
			'<div id="projectCard' + i + '" style="width: 100%;display: none;border-left-style: dotted;">' + projects[i].summary + '<p>' + projects[i].details + '<p>' + projects[i].motivation + '</div>';						
    }
            
    // Write HTML DOM string to DIV element
    document.getElementById('showData').innerHTML = domString;
		
}