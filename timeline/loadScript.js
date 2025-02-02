function loadScript(URL, description) {
	document.write('<script src="' + URL + '" onerror="window.alert(\'ERROR: Unable to load\n' + description + '\n' + this.src + ');"></script>');
}