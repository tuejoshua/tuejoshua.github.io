<?php

# Suggested usage of this file: Run the following wrapper code in a PHP file in the relevant directory
# (if you name it "index.php", you will - depending on your server settings - be able to run it automatically
# simply by requesting the path to the folder containing it)
#
# # Define local parameters
# $DIR = __DIR__;
# $FILE = __FILE__;
# PHP Magic Constants (like __DIR__ and __FILE__): https://www.php.net/manual/en/language.constants.magic.php
#
# # Call external script
# require '/srv/disk11/3649025/www/tuejoshua.atwebpages.com/showFolderContents.php';
# # ...(or wherever this file is located)
#

# If ANY of the 2 variables are NOT set (i.e. if this file is called directly)...
if (!isset($DIR, $FILE)) {

# ...automatically run the wrapper code defined above
# NB: make sure you want the folder containing this file to ALSO have this functionality!
#        $DIR = __DIR__;
#        $FILE = __FILE__;
        
# OR

# ...terminate the script (show the following message to the user)
        exit("Sorry, this page is configured so that you cannot execute it directly.<p>Click <a href=\"http://tuejoshua.atwebpages.com#Folder_index_page\">here</a> for more information.");

}

$trimIndex = strpos($DIR, "www/") + 4;
$trimFolderPath = substr($DIR, $trimIndex);
$thisFileName = substr($FILE, $trimIndex + strlen($trimFolderPath) +1); # +1 to get the "/" between folder and file name
?>
<html>
<head>
<title>
Contents of <?php echo $trimFolderPath; ?>
</title>
<script>
Files = new Array();
<?php

// get handle of current directory
$curDir = opendir(getcwd());

$Files = array();

// Loop over folder "entries"
// (See e.g. https://www.php.net/manual/en/function.readdir.php
while (($file = readdir($curDir)) !== false) {

        // remove this file itself, "directory up"- and "this directory"-elements
	if ($file != $thisFileName && $file != "." && $file != "..") {

                // saved at next free index in array
		$Files[count($Files)] = $file;

        }

}


closedir($curDir);

/// Sort found folders alphabetically
sort($Files,2);

// difficult to read because it contains php nested in JS nested in php :-S
for ($i = 0; $i < count($Files); $i++) echo "Files[$i] = '$Files[$i]';";


?>
</script>
</head>
<body>
<h1>Contents</h1>
<h2>(of <?php echo $trimFolderPath; ?>)</h2>
<script>
for (i=0; i<Files.length; i++) {
        document.write('<a href="' + Files[i] + '">');
        var x = Files[i];
        if (
        Files[i].endsWith('.gif')  ||
        Files[i].endsWith('.jpeg') ||
        Files[i].endsWith('.jpg')  ||
        Files[i].endsWith('.png') ) {
                document.write('<img src="' + Files[i] + '" height=100>');
        }
        document.write(Files[i] + '</a><br>');
}
</script>
</body>
</html>
