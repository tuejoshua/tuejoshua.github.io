/*
I called this function INCLUDE because it reminds me of C++ INCLUDE statements

USAGE:
# First, this line*:
<script src="PATH/include.js" onerror="window.alert('ERROR\n[unable to load ' + this.src + ']');"></script>

# Afterwards (NB: exclude ".js" from the input arguments):
<script>include('PathAndNameOfJsFile');</script> (1 file)
OR
<script>include(['File1', 'File2', ...]);</script> (1+ files)

*) this line (where we duplicate INCLUDE's internal functionality externally for loading itself) is obviously the most sub-optimal part; if only there was a way to use the function before it has been INCLUDEd, OR use a macro of sorts (like the C++ INCLUDE does)...
You can consider simplifying it by leaving out the ONERROR attribute in this line, which, in case include.js itself cannot be found, would result in NOTHING loading and no ALERTs being shown; this might be obvious anyway for some applications.

*/
function include(paths) {
	if (Array.isArray(paths)) {
		//window.alert(paths.length); // DEBUG
		for (i=0; i<paths.length; i++) {
			include1(paths[i]);
		}
	}
	else { // Assuming PATHS is a STRING, then
		include1(paths);
	}
}

function include1(path) {
	/* READABILITY NOTE: the following statement is JS(HTML(JS)),
	where the HTML uses double quotes (") and the JSs single quotes (')
	(as per my standard convention); the inner JS is of course escaped (\');
	the already escaped NEWLINE had to be escaped AGAIN (\\n) */

	document.write('<script src="' + path + '.js" onerror="window.alert(\'ERROR\\n[unable to load \' + this.src + \']\');"></script>');

}