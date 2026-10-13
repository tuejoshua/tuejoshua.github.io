/*

INPUT:
The following GLOBAL(!) variables are assumed (will only be read from here, not written to):
- items[0]
- items[1],
which are outputs from loadFromLibrary (elsewhere), and
- larger: {0 (item 0 < item 1); 1 (item 0 ~ item 1); 2 (item 0 < item 1)}
Furthermore:
- localStorage.hilchotBrachot.Pref<A>#<B> parameters as applicable (see elsewhere), where <A> and <B> are the .title fields of items[]

RETURNS:
an object "Q":
.verdict - an UINT in {0 (item0 wins), 1 (tie), 2 (item1 wins)}
.rationales - an Nx3 array (N in {1-6}), where each of the N entries is 3 strings belonging to [item0, Parameter, item1], where Parameter is the criterium being compared.
// NOTE: Max is 6 rows, e.g. Eitz Vs. Adama; equally whole; equally preferred; equally 7-species; equal size; Eitz <-- Adama
// TBD: Consider if we want to
// - return the number of decision points ("N" above) explicitly
// - - .rationales ALWAYS 6x2 (for speed?), then using such an explicit parameter

*/

//GLOBALS(!)
var settingsPage = 'settings.html';

function getPreferenceVerdict(x, y) { // x > y, x == y or x < y
	if (x < y) {
		return getPrefVerdict(items[0], items[1]);
	}
	else if (x > y) {
		return Math.abs(getPrefVerdict(items[1], items[0])-2); // Remap {1,X,2} -> {2,X,1} in this case
	}
	else { // i.e. x == y
		return 1; // i.e. 'X' in {1,X,2}
	}
}

function getPrefVerdict(itemA, itemB) { // A < B
	// Check if Preference Data exists
	key = 'hilchotBrachot.Prefs.' + itemA.title + '#' + itemB.title;
	if (localStorage.getItem(key) == null) {
		window.alert('ERROR - could not find Preferences data for this pair. \n You will now be directed to the Preferences setup.');
		//window.alert('Missing localStorage variable: [' + key + ']'); // DEBUG
		window.location.href = settingsPage;
	}
	else {
		//window.alert(key + ' found!'); // DEBUG
		return Number(localStorage.getItem(key));
	}
}

function precedencePipeline() {

	var Q = {}; // init object

	Q['rationales'] = [[brachot[items[0].bracha], 'category', brachot[items[1].bracha]]]; // entry 0

							/// SAME BRACHA/CATEGORY

	if (items[0].bracha == items[1].bracha) {
		switch (items[0].bracha) {
			case 1: // HaMotzi
				// WHEAT over BARLEY over "otherwise"
				Q.rationales.push([sevenSpecies[items[0].sevenSpecies], 'sevenSpecies', sevenSpecies[items[1].sevenSpecies]]); // entry 1 (0-based)
				if (items[0].sevenSpecies != items[1].sevenSpecies) {
					Q['verdict'] = (items[0].sevenSpecies < items[1].sevenSpecies)*2; // 0 if (0,1) = (wheat vs. barley), (wheat vs. otherwise) OR (barley vs. otherwise); 2 if v.v.
					return Q;
				}
				else { // both the same: {WHEAT, BARLEY OR otherwise}
					// WHOLE:
					Q.rationales.push([
					(items[0].isWhole)?'whole (שלם)':'not whole (לא שלם)', 'isWhole',
					(items[1].isWhole)?'whole (שלם)':'not whole (לא שלם)']); // entry 1 (0-based)
					if (items[0].isWhole != items[1].isWhole) {
					Q['verdict'] = (items[0].isWhole < items[1].isWhole)*2; // 1 if item 0 is whole and item 1 is not; 2 if v.v.
						return Q;
					}
					else { // Both whole OR both NOT whole
						// LARGER
						switch (larger) {
							case 0:
								Q.rationales.push(['larger', 'isLarger', 'smaller']); // entry 2 (0-based)
								break;
							case 1:
								Q.rationales.push(['same size', 'isLarger', 'same size']); // entry 2 (0-based)
								break;
							case 2:
								Q.rationales.push(['smaller', 'isLarger', 'larger']); // entry 2 (0-based)
								break;
							default:
								window.alert('ERROR [in SWITCH in getCorrectAnswer() - larger: ' + larger + ']');
						}
						Q['verdict'] = larger;
						return Q;
					}
				}
			case 2: // Mezonot/korn
				// BAKED (over COOKED)
				Q.rationales.push([(items[0].isBaked)?'baked':'not baked', 'isBaked', (items[1].isBaked)?'baked':'not baked']); // entry 1 (0-based)
				if (items[0].isBaked != items[1].isBaked) {
					Q['verdict'] = (items[0].isBaked < items[1].isBaked)*2; // 0 if item 0 is baked and item 1 is not; 2 if v.v.
					return verdict;
				}
				else { // i.e. both baked OR both cooked
					Q['verdict'] = 1; // i.e. 'X' in {1,X,2}
					return Q;
				}
			case 3: // haGafen
			case 4: // Mezonot/ris
				Q['verdict'] = 1; // i.e. 'X' in {1,X,2}
				return Q;
			case 5: // haEitz
			case 6: // haAdama
				// WHEAT over BARLEY over OLIVES etc.
				Q.rationales.push([sevenSpecies[items[0].sevenSpecies], 'sevenSpecies', sevenSpecies[items[1].sevenSpecies]]); // entry 1 (0-based)
				if (items[0].sevenSpecies != items[1].sevenSpecies) {
					Q['verdict'] = (items[0].sevenSpecies < items[1].sevenSpecies)*2; // 0 if item 0 is higher in the sevenSpecies than item 1; 2 if v.v.
					return Q;
				}
				else { // both the same: {WHEAT, BARLEY, OLIVES etc.
					// WHOLE
					Q.rationales.push([(items[0].isWhole)?'whole (שלם)':'not whole (לא שלם)', 'isWhole', (items[1].isWhole)?'whole (שלם)':'not whole (לא שלם)']); // entry 2 (0-based)
					if (items[0].isWhole != items[1].isWhole) {
						Q['verdict'] = (items[0].isWhole < items[1].isWhole)*2; // 0 if item 0 is whole and item 1 is not; 2 if v.v.
						return Q;
					}
					else { // Both whole OR both NOT whole
						// PREFER:
						Q['verdict'] = getPreferenceVerdict(items[0].libraryEntryNo, items[1].libraryEntryNo);
						switch (Q.verdict) {
							case 0:
								Q.rationales.push(['More preferred (חביב)', 'isPreferred', 'Less preferred']); // entry 3 (0-based)
								break;
							case 1:
								Q.rationales.push(['Equally preferred', 'isPreferred', 'Equally preferred']); // entry 3 (0-based)
								break;
							case 2:
								Q.rationales.push(['Less preferred', 'isPreferred', 'More preferred (חביב)']); // entry 3 (0-based)
								break;
							default:
								window.alert('ERROR [in SWITCH in getCorrectAnswer() - Q.verdict = ' + Q.verdict + ']');
						}
						if (Q.verdict != 1) { // i.e. '1' or '2' in {1,X,2}
							return Q;
						}
						else {
							// LARGER
							switch (larger) {
							case 0:
								Q.rationales.push(['larger', 'isLarger', 'smaller']); // entry 4 (0-based)
								break;
							case 1:
								Q.rationales.push(['same size', 'isLarger', 'same size']); // entry 4 (0-based)
								break;
							case 2:
								Q.rationales.push(['smaller', 'isLarger', 'larger']); // entry 4 (0-based)
								break;
							default:
								window.alert('ERROR [in SWITCH in getCorrectAnswer() - larger: ' + larger + ']');
							}
						Q['verdict'] = larger;
						return Q;
						}
					}
				}
			case 7:
				// WHOLE:
				Q.rationales.push([(items[0].isWhole)?'whole (שלם)':'not whole (לא שלם)', 'isWhole', (items[1].isWhole)?'whole (שלם)':'not whole (לא שלם)']); // entry 1 (0-based)
				if (items[0].isWhole != items[1].isWhole) {
					Q['verdict'] = (items[0].isWhole < items[1].isWhole)*2; // 0 if item 0 is whole and item 1 is not; 2 if v.v.;
					return Q;
				}
				else { // Both whole OR both NOT whole
					// PREFER
					Q['verdict'] = getPreferenceVerdict(items[0].libraryEntryNo, items[1].libraryEntryNo);
					switch (Q.verdict) {
						case 0:
							Q.rationales.push(['More preferred (חביב)', 'isPreferred', 'Less preferred']); // entry 2 (0-based)
							break;
						case 1:
							Q.rationales.push(['Equally preferred', 'isPreferred', 'Equally preferred']); // entry 2 (0-based)
							break;
						case 2:
							Q.rationales.push(['Less preferred', 'isPreferred', 'More preferred (חביב)']); // entry 2 (0-based)
							break;
						default:
						window.alert('ERROR [in SWITCH in getCorrectAnswer() - verdict = ' + verdict + ']');
					}
					if (Q.verdict != 1) { // i.e. '1' or '2' in {1,X,2}
						return Q;
					}
					else {
						// LARGER:
						switch (larger) {
							case 0:
								Q.rationales.push(['larger', 'isLarger', 'smaller']); // entry 3 (0-based)
								break;
							case 1:
								Q.rationales.push(['same size', 'isLarger', 'same size']); // entry 3 (0-based)
								break;
							case 2:
								Q.rationales.push(['smaller', 'isLarger', 'larger']); // entry 3 (0-based)
								break;
							default:
								window.alert('ERROR [in SWITCH in getCorrectAnswer() -  larger: ' + larger + ']');
						}
						Q['verdict'] = larger;
						return Q;
					}
				}
			case 8:
				// PREFER
				Q['verdict'] = getPreferenceVerdict(items[0].libraryEntryNo, items[1].libraryEntryNo);
				switch (Q.verdict) {
					case 0:
						Q.rationales.push(['More preferred (חביב)', 'isPreferred', 'Less preferred']); // entry 1 (0-based)
						break;
					case 1:
						Q.rationales.push(['Equally preferred', 'isPreferred', 'Equally preferred']); // entry 1 (0-based)
						break;
					case 2:
						Q.rationales.push(['Less preferred', 'isPreferred', 'More preferred (חביב)']); // entry 1 (0-based)
						break;
					default:
						window.alert('ERROR [in SWITCH in getCorrectAnswer() - verdict = ' + verdict + ']');
				}
				return Q;
			default:
				window.alert('ERROR!\n[in SWITCH in getCorrectAnswer(): items[0].bracha = ' + items[0].bracha + ']');
		}
	}

							/// DIFFERENT BRACHA/CATEGORY

	else { // i.e. NOT same bracha category
		// Regarding the following section (which could probably be optimized further), see https://stackoverflow.com/questions/7820683/convert-boolean-result-into-number-integer
		if (items[0].bracha < items[1].bracha) {
			hiPriority = false;
		}
		else {
			hiPriority = true;
		}
		if (items[+hiPriority].bracha == 5 && items[+!hiPriority].bracha == 6) { // 1 Eitz, 1 Adama
			// WHOLE
			Q.rationales.push([(items[0].isWhole)?'whole (שלם)':'not whole (לא שלם)', 'isWhole', (items[1].isWhole)?'whole (שלם)':'not whole (לא שלם)']); // entry 1 (0-based)
			if (items[0].isWhole != items[1].isWhole) {
				Q['verdict'] = (items[0].isWhole < items[1].isWhole)*2; // 1 if item 0 is whole and item 1 is not; 2 if v.v.
				return Q;
			}
			else { // Both whole OR both NOT whole
				// PREFER
				Q['verdict'] = getPreferenceVerdict(items[0].libraryEntryNo, items[1].libraryEntryNo);
				switch (Q.verdict) {
					case 0:
						Q.rationales.push(['More preferred (חביב)', 'isPreferred', 'Less preferred']); // entry 2 (0-based)
						break;
					case 1:
						Q.rationales.push(['Equally preferred', 'isPreferred', 'Equally preferred']); // entry 2 (0-based)
						break;
					case 2:
						Q.rationales.push(['Less preferred', 'isPreferred', 'More preferred (חביב)']); // entry 2 (0-based)
						break;
					default:
						window.alert('ERROR [in SWITCH in getCorrectAnswer() - verdict = ' + verdict + ']');
				}

				if (Q.verdict != 1) { // i.e. '1' or '2' in {1,X,2}
					return Q;
				}
				else {
					// SEVEN SPECIES
					Q.rationales.push([sevenSpecies[items[0].sevenSpecies], sevenSpecies[items[1].sevenSpecies]]); // entry 3 (0-based)
					if (items[0].sevenSpecies != items[1].sevenSpecies) {
						Q['verdict'] = (items[0].sevenSpecies < items[1].sevenSpecies)*2; // 0 if item 0 is higher in the sevenSpecies than item 1; 2 if v.v.
						return Q;
					}
					else { // both the same: {WHEAT, BARLEY, OLIVES etc.
						// LARGER
						switch (larger) {
							case 0:
								Q.rationales.push(['larger', 'isLarger', 'smaller']); // entry 4 (0-based)
								break;
							case 1:
								Q.rationales.push(['same size', 'isLarger', 'same size']); // entry 4 (0-based)
								break;
							case 2:
								Q.rationales.push(['smaller', 'isLarger', 'larger']); // entry 4 (0-based)
								break;
							default:
								window.alert('ERROR [in SWITCH in getCorrectAnswer() -  larger: ' + larger + ']');
						}
						if (larger != 1) {
							Q['verdict'] = larger;
							return Q;
						}
						else { // items equally sized
							// HAEITZ
							Q.rationales.push([brachot[items[0].bracha], brachot[items[1].bracha]]); // entry 5 (0-based)
							Q['verdict'] = (items[0].bracha > items[1].bracha)*2; // 0 if item 0 is haEitz (and item 1 is Adama); 2 if v.v.
							return Q;
						}
					}
				}
			}
		}
		else {
			Q['verdict'] = hiPriority*2; // maps to {0, 2} i.e. '1' or '2' in {1,X,2}
			return Q;
		}
	}
}
