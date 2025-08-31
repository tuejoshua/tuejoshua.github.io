<!DOCTYPE HTML>

<HTML>

<HEAD>


<SCRIPT>

numThumbs = 5; // number of Thumb images - must correspond to <img> Thumb fields!

// Array of Danish or English titles for Folders. Make sure the order is in the same order as the alphabetical order of the actual (short) folder names.
folderNames = ["graphics used by this PHP gallery itself"]; //"food items", "hilchot brachot icons"];

				/// Declare JavaScript arrays for later use ///

baseDir = '';
Folders = new Array();
Images = new Array();
Indices = new Array(); // Indices in Images where a new Folder's images starts

<?php

				/// Find folders of images ///

// Base folder containing the image folders
$baseDir = "./"; // "../hilchotBrachot/resources";

// get handle of current directory
$curDir = opendir($baseDir);

// Declare PHP array (otherwise, the code below will not work - on this server at least...)
$Folders = array();

// somehow this finds all the files
while (($file = readdir($curDir)) != false)
	{

        // remove non-folder-, "directory up"- and "this directory"-elements
	if (!strpos($file,".") && $file != "." && $file != "..")

		{

                // saved at next free index in array
		$Folders[count($Folders)] = $file;

                }

	}


closedir($curDir);

				/// Sort found folders alphabetically

				sort($Folders,2);


				/// For every found folder, find images ///

// Declare PHP array (otherwise, the code below will not work - on this server at least...)
$Indices = array();
$Images = array();

for ($i = 0; $i < count($Folders); $i++) { //

	$Indices[count($Indices)] = count($Images); // Record index of 'Folder start' image

	$curDir = opendir($baseDir . $Folders[$i]); // get handle of current directory

	$images = array(); // Initialize (clear) array for images in one folder

	while (($file = readdir($curDir)) != false) // somehow this finds all the files
		{
		if ($file != "." && $file != "..") // remove "directory up" and "this 		directory"-elements
			{
		$images[count($images)] = $file; // saved at next free index in array
			}
		}

	closedir($curDir);

	sort($images,2); // Sort found images alphabetically

	for ($j=0; $j<count($images); $j++) {

		$Images[count($Images)] = $images[$j];

	}

	}


			/// Bridge the gap: copy from php arrays to JavaScript ditto ///

echo "BaseDir = '$baseDir';";
for ($i = 0; $i < count($Folders); $i++) echo "Folders[$i] = '$Folders[$i]';";
// difficult to read because it contains php nested in JS nested in php :-S
for ($i = 0; $i < count($Images); $i++) echo "Images[$i] = '$Images[$i]';";
for ($i = 0; $i < count($Indices); $i++) echo "Indices[$i] = $Indices[$i];";

?>

// Add arbitrary extra element for easier code later
Indices[Indices.length] = Images.length;

/// Gallery functions


function ChangeMain(f,n) { // Changes Main image to image n in folder f

document.images.Main.src = 'graphics/blank.png';

if (n < (Indices[f+1]-Indices[f])) { // If Image index is not out of bounds for this Folder

document.images.Main.src = 'graphics/hourglass_anim.gif';
document.images.Main.src = baseDir + Folders[f] + '/' + Images[Indices[f] + n];
document.images.Main.alt = baseDir + Folders[f] + '/' + Images[Indices[f] + n];
document.images.Main.title = baseDir + Folders[f] + '/' + Images[Indices[f] + n];

document.FolderForm.CurrentImageNumberText.value = n+1; // Update Image Counter Text Field
}

current = n;
									// Update Prev and Next buttons

if (current<1) document.images.Prev.src="graphics/blank.png";
else document.images.Prev.src="graphics/prev.png";

if (current>=(  Indices[f+1]-Indices[f]-1   )) document.images.Next.src="graphics/blank.png";
else document.images.Next.src="graphics/next.png";


}



function ChangeThumbs(f,page) { // Change Thumbs

PAGE = page; // global(?) var for use later

for (i=0;i<5;i++) {	// load Thumb images
if ((Indices[f]+page*numThumbs+i) >= Indices[f+1]) { // If index out of bounds when accessing 5 thumb images
	eval("document.images.Thumb"+(i+1)+".src='graphics/blank.png';");
	// We need EVAL because thumbnail <IMG>s are named Thumb1, Thumb2 etc.
        eval("document.images.Thumb"+(i+1)+".title='';");
}
else {
	eval("document.images.Thumb"+(i+1)+".src='graphics/hourglass_anim.gif';");
	eval("document.images.Thumb"+(i+1)+".src= baseDir + Folders[f] +'/'+ Images["+(Indices[f]+page*numThumbs+i)+"];");
        eval("document.images.Thumb"+(i+1)+".title= Images["+(Indices[f]+page*numThumbs+i)+"];");
	}
}

									// Update Rewind and Fastforward buttons

if (page<1) {document.images.Rewind.src="graphics/blank.png";}
else {document.images.Rewind.src="graphics/prev.png";}


if ((page+1)>=((Indices[f+1]-Indices[f])/numThumbs)) {document.images.Fastforward.src="graphics/blank.png";}
else {document.images.Fastforward.src="graphics/next.png";}


}


function OpenFolder(f) {


f = Number(f); // Typecasting from string


ChangeMain(f,0);

ChangeThumbs(f,0);

document.FolderForm.TotalNumberOfImagesText.value = Indices[f+1]-Indices[f]; // Update Image Counter Text Field


}



function m0() { // onMouseOut function for all gallery IMG elements
document.body.style.cursor="auto";
}

function m1() { // onMouseOver function for all gallery IMG elements
document.body.style.cursor="pointer";
}

function CM() {	// Click Main - Clicking on the Main image opens a new window with the image

window.open(baseDir+Folders[Number(document.FolderForm.FolderSelect.value)]+'/'+Images[Indices[Number(document.FolderForm.FolderSelect.value)]+current]);
}

function CT(n) { // Click Thumb no. n loads it into Main
ChangeMain(Number(document.FolderForm.FolderSelect.value), PAGE*numThumbs+n);
}

function CP() { // Click Previous for Main image
if (current>0) ChangeMain(Number(document.FolderForm.FolderSelect.value),current-1);
}

function CN() { // Click Next for Main image
if ((Indices[Number(document.FolderForm.FolderSelect.value)+1]-Indices[Number(document.FolderForm.FolderSelect.value)]) > (current+1)) ChangeMain(Number(document.FolderForm.FolderSelect.value),current+1);
}

function CR() { // Click Rewind for Thumbs page
if (PAGE>0) ChangeThumbs(Number(document.FolderForm.FolderSelect.value),PAGE-1);
}

function CF() { // Click Forward for Thumbs page
if ((PAGE+1)<( (Indices[Number(document.FolderForm.FolderSelect.value)+1]-Indices[Number(document.FolderForm.FolderSelect.value)])/numThumbs)) ChangeThumbs(Number(document.FolderForm.FolderSelect.value),PAGE+1);
}

</SCRIPT>

</HEAD>

<BODY onload="OpenFolder(document.FolderForm.FolderSelect.value);">

<H2>Galleri</H2>
<BR><BR>

<TABLE style="width: 100%">
        <TR>
                <TD></TD>
                <TD>
                        <FORM name="FolderForm">
                        <TABLE STYLE="width: 100%">
                                <TR>
                                        <TD>
                                                <SELECT name="FolderSelect" onChange="OpenFolder(document.FolderForm.FolderSelect.value);">
                                                <SCRIPT>

                                                        /// Create drop-down menu from found image folders

                                                        for (i=0;i<Folders.length;i++) {
                                                                document.write('<OPTION VALUE="' + i + '">' + folderNames[i] + '</OPTION>');
                                                        }
                                                </SCRIPT></SELECT>
                                        </TD>
                                        <TD STYLE="text-align: right">
                                                Viser billede
                                                <INPUT TYPE="text" NAME="CurrentImageNumberText" VALUE="..." SIZE=1 STYLE="text-align: right" READONLY>
                                                af
                                                <INPUT TYPE="text" NAME="TotalNumberOfImagesText" VALUE="..." SIZE=1 STYLE="text-align: right" READONLY>
                                        </TD>
                                </TR>
                        </TABLE>
                        </FORM>
                </TD>
                <TD></TD>
        </TR>
        <TR>
                <TD style="width: 10%">
                        <img id="Prev" width=50 onMouseOut="m0();" onMouseOver="m1();" onClick="CP();">
                </TD>
                <TD>
                        <CENTER>
                        <img id="Main" src="graphics/blank.png" height=300 onMouseOut="m0();" onMouseOver="document.body.style.cursor='url(graphics/magGlass.cur),url(graphics/magGlass.ico),pointer';" onClick="CM();" title="Klik for at åbne i fuld størrelse">
                        </CENTER>
                </TD>
                <TD style="width: 10%">
                        <img id="Next" width=50 onMouseOut="m0();" onMouseOver="m1();" onClick="CN();">
                </TD>
        </TR>
        <TR>
                <TD>
                        <img id="Rewind" width=50 onMouseOut="m0();" onMouseOver="m1();" onClick="CR();">
                </TD>
                <TD>
                        <CENTER>
                        <script>
                                for (i = 0; i < numThumbs; i++) {
                                        document.write('<img id="Thumb' + (i+1) + '" src="graphics/blank.png" height=50 onMouseOut="m0();" onMouseOver="m1();" onClick="CT(' + i + ');">');
                                }
                        </script>
                        </CENTER>
                </TD>
                <TD>
                        <img id="Fastforward" width=50 onMouseOut="m0();" onMouseOver="m1();" onClick="CF();">
                </TD>
        </TR>
</TABLE>

</BODY>
</HTML>
