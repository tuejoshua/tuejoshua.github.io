function Json2JsObj(file) {

// Create XMLHttpRequest object.
var oXHR = new XMLHttpRequest();

// Initiate request.
oXHR.onreadystatechange = reportStatus;
oXHR.open("GET", file, true);  // get json file.
oXHR.send();

function reportStatus() {
    if (oXHR.readyState == 4) {		// Check if request is complete.
            
        // Parse text contents of JSON file into Javascript object
        return JSON.parse(this.responseText);
		
}