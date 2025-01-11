function Json2JsObj(file) {

	// Create XMLHttpRequest object.
	var oXHR = new XMLHttpRequest();

	// Initiate request.
	oXHR.onreadystatechange = reportStatus(oXHR); // ADDED input param here and on function declaration below...?
	oXHR.open("GET", file, true);  // get json file.
	oXHR.send();

function reportStatus(oXHR) {
    if (oXHR.readyState == 4) {		// Check if request is complete.
            
        // Parse text contents of JSON file into Javascript object
        var projects = JSON.parse(this.responseText);
		
		// Build HTML DOM string	
        var domString = '';
     
        for (i=0; i<projects.length; i++) {
					
			domString += '<button type="button" style="width: 100%;text-align: left;" onclick="showProjectCard(' + i + ');">' +
				'<table style="width: 100%; border-collapse: collapse;"><tr><td style="border: none;">' + projects[i].title + '</td><td style="text-align: right; border: none;">';
					
			for (let tag of projects[i].technologies) {
				domString += getTechLogo(tag);
			}
					
			domString += '</td></tr></table></button>' +
				'<div id="projectCard' + i + '" style="width: 100%;display: none;border-left-style: dotted;">' + projects[i].summary + '<p>' + projects[i].details + '<p>' + projects[i].motivation + '</div>';						
        }
            
        // Write HTML DOM string to DIV element
        document.getElementById('showData').innerHTML = domString;
		
		return;
		
	}	
}

}