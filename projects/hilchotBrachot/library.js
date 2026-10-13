
// Mapping of numbers to strings (1-based, therefore the 0-entry is empty)
brachot = [ , 'haMotzi', 'Mezonot/korn', 'haGafen', 'Mezonot/ris', 'haÆtz', 'haAdama', 'Shehakol/fast', 'Shehakol/flydende'];

// "The order, therefore, is: 1. wheat, 2. barley, 3. olives, 4. dates, 5. grapes, 6. figs and 7. pomegranates." [https://www.aish.com/h/15sh/ho/93224084.html]
sevenSpecies = ['(Not one of the 7 species)', '(7) granatæble', '(6) figen', '(5) vindrue', '(4) dadel', '(3) oliven', '(2) byg', '(1) hvede'];

fullLibrary = [

/* While hunting for images of BARLEY bread, I found that _all_ recipes include MORE other (WHEAT) flour than barley flour.
I assume one should employ a MAJORITY rule in such situations; in any case, I did not want to include these 'inbetween' cases
here in the library.
I further found that even traditional Danish RUGBRØD has about 1/4 th of the flour being WHEAT...! */

// a. HaMotzi [Title, 1=haMotzi, IsWhole, 7Species{7=hvede, 6=byg, 0=else}, ImagePath]

['Challah', 1, true, 7, 'challe.jpg'],
['Rye bread', 1, false, 0, 'rugbrød.jpg'],

// b. Mezonot/korn [Title, 2=Mezonot/korn, IsBaked(!Cooked), ImagePath]
/* NOTE: PANCAKES are a safek hamotzi/mezonot (cooked in MORE liquid than BAKED bread, but LESS than e.g. COOKED pasta); they are therefore NOT included here */

['Danish Brunsviger cake', 2, true, 'brunsviger.jpg'],

// c. HaGafen [Title, 3=haGafen, ImagePath]



// d. Mezonot/ris [Title, 4=Mezonot/ris, ImagePath]



// "e." HaÆtz [Title, 5=haÆtz, IsWhole, 7species{5=oliven, 4=dadel, 3=vindrue, 2=figen, 1=granatæble, 0=else}, ImagePath]

['Olives', 5, true, 5, 'oliven.jpg'],
['Apple', 5, true, 0, 'æble.jpg'],
['Pomegranate seeds', 5, false, 1, 'granatæblekerner.jpg'],
['Apple boats', 5, false, 0, 'æblebåde.jpg'],
['Dates', 5, true, 4, 'dadler.jpeg'],


//"f." HaAdama [Title, 6=haAdama, IsWhole, 7Species{7=hvede, 6=byg, 0=else}, ImagePath

['Banana', 6, true, 0, 'banan.jpg'],
['Potatoes with parsley sauce', 6, false, 0, 'kartofler_persillesovs.jpg'],
['Carrot sticks', 6, false, 0, 'gulerodsstave.jpg'],


// g. Shehakol/fast [Title, 7=Shehakol/solid, IsWhole, ImagePath]

['Plaice fillet, breaded', 7, false, 'rødspættefilet.jpg'],


// h. Shehakol/flydende [Title, 8=Shehakol/flydende, ImagePath]

['Coke', 8, 'cola.jpg'],


];

library = structuredClone(fullLibrary);

// REMOVE items that were excluded by the user

for (i = library.length-1; i>-1; i--) {
	
	excludedAccordingToLocalStorage = localStorage.getItem('hilchotBrachot.Exclude.' + library[i][0]);
	
	if (excludedAccordingToLocalStorage !== null) { // Check if exists
		library.splice(i, 1); // remove the item
	}
	
}
