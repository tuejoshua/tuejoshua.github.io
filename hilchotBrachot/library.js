
// Mapping of numbers to strings (1-based, therefore the 0-entry is empty)
brachot = [ , 'haMotzi', 'Mezonot/korn', 'haGafen', 'Mezonot/ris', 'haÆtz', 'haAdama', 'Shehakol/fast', 'Shehakol/flydende'];

// "The order, therefore, is: 1. wheat, 2. barley, 3. olives, 4. dates, 5. grapes, 6. figs and 7. pomegranates." [https://www.aish.com/h/15sh/ho/93224084.html]
sevenSpecies = ['(Not one of the 7 species)', '(7) granatæble', '(6) figen', '(5) vindrue', '(4) dadel', '(3) oliven', '(2) byg', '(1) hvede'];

library = [

/* While hunting for images of BARLEY bread, I found that _all_ recipes include MORE other (WHEAT) flour than barley flour.
I assume one should employ a MAJORITY rule in such situations; in any case, I did not want to include these 'inbetween' cases
here in the library.
I further found that even traditional Danish RUGBRØD has about 1/4 th of the flour being WHEAT...! */

// a. HaMotzi [Title, 1=haMotzi, IsWhole, 7Species{7=hvede, 6=byg, 0=else}, ImagePath]

['Challa', 1, true, 7, 'challah_crop.jpg'],
['Rugbrød', 1, false, 0, 'rugbrød2.jpg'],

// b. Mezonot/korn [Title, 2=Mezonot/korn, IsBaked(!Cooked), ImagePath]
/* NOTE: PANCAKES are a safek hamotzi/mezonot (cooked in MORE liquid than BAKED bread, but LESS than e.g. COOKED pasta); they are therefore NOT included here */

['Brunsviger', 2, true, 'brunsviger_crop.jpg'],

// c. HaGafen [Title, 3=haGafen, ImagePath]



// d. Mezonot/ris [Title, 4=Mezonot/ris, ImagePath]



// "e." HaÆtz [Title, 5=haÆtz, IsWhole, 7species{5=oliven, 4=dadel, 3=vindrue, 2=figen, 1=granatæble, 0=else}, ImagePath]

['Oliven', 5, true, 5, 'olives_crop.jpg'],
['Æble', 5, true, 0, 'apple_crop.jpg'],
['Granatæblekerner', 5, false, 1, 'granatæblekerner.jpg'],
['Æblebåde', 5, false, 0, 'æblebåde.jpg'],
['Dadler', 5, true, 4, 'dadler.jpeg'],


//"f." HaAdama [Title, 6=haAdama, IsWhole, 7Species{7=hvede, 6=byg, 0=else}, ImagePath

['Banan', 6, true, 0, 'banana.jpg'],
['Kartofler med persillesovs', 6, false, 0, 'kartofler_persilleSovs.jpg'],
['Gulerodsstave', 6, false, 0, 'gulerodsstave.jpg'],


// g. Shehakol/fast [Title, 7=Shehakol/solid, IsWhole, ImagePath]

['Rødspættefilet, paneret', 7, false, 'RødspætteFilet.jpg'],


// h. Shehakol/flydende [Title, 8=Shehakol/flydende, ImagePath]

['Cola', 8, 'coke2_crop.jpg'],


];
