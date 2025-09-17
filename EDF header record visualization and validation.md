<!--"motivation":" -->
At one point, I was tasked with verifying the format and contents of the files produced by my company's software; more specifically, the header records of [EDF+](https://www.edfplus.info/) files.
This was done initially by opening the file in Notepad and inspecting line and column position of data — very unsatisfying and error prone, as you can imagine. Also, I suspected that I was missing out on "really" understanding the format, and that I could gain a lot of insight from visualizing it somehow.  
  
**Summary:** A front-end page that lets you select a(n EDF) file, and displays the contents of the header record in a very clear and readable manner. Includes functionality for further visualization adjustment, and validation of the contents vs. user-defined pseudo-RegEx formatting patterns.

_Sorry, the tool was developed on company time, so I cannot share the code — in fact, I no longer have access to it.  
If I find a need for a similar tool (probably for another file format) in the future, I might try to recreate (a better version! of) it and share here..._

**Features** (in pseudo-chronological order):
- Before file selection, the tool (already) visualizes the EDF+ file format in a table format, incl. field names and sizes
- The user can supply the EDF+ file to be visualized 
(via an `<input type="file">` [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) element, which is read by a [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) object)
- Once a file is selected, the empty (data) table cells are filled in, and the table itself is reformatted according to the _number of signals (ns)_ field (as defined by the file format)
- A very clean and efficient layout using different font faces, colors, highlighting etc. — i.e. basic CSS stuff, just the way I love it!
- Good decoupling via splitting of purposes into separate files and functions:  
  Separate `.js` files (some of which would have been `.json`, had I discovered that technology earlier) defining
  - title, size, and validation rule for the fields, <!-- stored in 2 files: globalFields and localFields --> 
  - the (CSS) formatting rules, and
  - the main parts of the data parsing algorithm

**Side note:** Sample EDF files are available [here](https://www.teuniz.net/edf_bdf_testfiles/index.html), which by the way is a subdirectory of [Teunis van Beelen\'s homepage](https://www.teuniz.net), a great resource for free EDF-related software (and other things.)

<!-- ToDo: Finish this

 **Learnings:**  
 It took me quite an effort to make it possible for the user to provide the input (EDF) file. In the end, I found a fairly concise solution that seemed to be consensual across different web fora... even so, I had a hard time understanding the code - and honestly, looking at that part of the code now still annoys me.
 I have since come to understand that unlike all the JS code I had written up until that point - which was synchronous and procedural, what I was trying to do here was [asynchronous](https://en.wikipedia.org/wiki/Asynchrony_(computer_programming))* functionality, which was a step up in complexity - and also required a very different syntax.

 *) I've later noticed that this COULD probably done more simple via event handlers, although this would be subject to and therefore sub-optimal:

 ...Furthermore, this was an exercise in how to obtain a very compact and info-ful layout
 ...very proud of separation into several smaller files (Separation of Concerns)...

 -->