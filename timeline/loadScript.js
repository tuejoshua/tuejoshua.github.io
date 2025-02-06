function loadScript(URL, description) {
// description parameter is optional
	
	switch (description) {
		
		case undefined:
		document.write('<script src="' + URL + '" onerror="window.alert(\'ERROR: Unable to load\n' + this.src + ');"></script>');
		break;
		
		default: // i.e. description parameter was included
		document.write('<script src="' + URL + '" onerror="window.alert(\'ERROR: Unable to load\n' + description + '\n' + this.src + ');"></script>');
	}
}