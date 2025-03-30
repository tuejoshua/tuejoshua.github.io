/*
* This function assumes that the variable "library" already exists, i.e. that library.js was included BEFORE this file!
*/
function loadFromLibrary(entryNo, full) {

	if (full === undefined) {
		entry = library[entryNo];
	}
	else {
		entry = fullLibrary[entryNo];
	}



	var item = {};

	item['title'] = entry[0];
	item['bracha'] = entry[1];

	item['imagePath'] = 'resources/foods/';

	// get "imagePath"
	switch (item['bracha']) {
		case 2:
		case 7:
			item['imagePath'] += entry[3];
			break;
		case 3:
		case 4:
		case 8:
			item['imagePath'] += entry[2];
			break;
		case 1:
		case 5:
		case 6:
			item['imagePath'] += entry[4];
	}

	// If applicable: 'isWhole' and/or 'sevenSpecies'
	switch (item['bracha']) {
		case 1: // Motzi
		case 5: // Æitz
		case 6: // Adama
			item['sevenSpecies'] = entry[3];
			// NB: the above CASES will continue with the 'isWhole' statement below
			// (because there is no BREAK statement)
		case 7: // Shehakol/fast
			item['isWhole'] = entry[2];
	}

	// If applicable: library entry no. (used by pairwise Preferences data)
	switch (item['bracha']) {
		case 5: // Æitz
		case 6: // Adama
		case 7: // Shehakol/fast
		case 8: // Shehakol/flydende
			item['libraryEntryNo'] = entryNo;
	}

	if (item['bracha']==2) { // Mezonot
		item['isBaked'] = entry[2];
	}

	return item;

}
