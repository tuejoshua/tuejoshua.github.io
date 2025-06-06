<!-- **Motivation:**  -->
_"Please report how much time has been spent on each project per day."_  
Although such a demand* for time registration has been recurring throughout my career, it took me quite some time and effort to make peace with it.
This is because I usually can't remember — with adequate precision — what I did just half a day ago, and so, trying to guesstimate these numbers _at the end_ of the work day is very unsatisfying. I tried doing this time registration _throughout_ the day, but found that it made me ineffective in my REAL work by taking up significant mental bandwidth.

While discussing another topic with a colleague, I found out that the good ol' Windows app Notepad has a shortcut (F5) for logging timestamps. After throwing together an unglamorous, but very efficient tab-separated value format, this gave me an easy way of checking in and out of projects and tasks during the work day — but a lot of minute-precision data points that needed parsing. Time for automation! 😉

**Summary:**  
A Python-based tool compiled to an executable that I could run on my work PC. Reading the above-described timestamp file, and generating a CSV file containing time spent per project per day — plus a Pyplots "dashboard" for visualizing statistics as additional sanity checks — and keeping up with how the month's work was progressing.

_Unfortunately, the tool was developed partly on company time, so I cannot share it. I may generate and share some sketches or other way of illustration in the future..._

Some **details** of interest:
Reading the timestamp file, accumulating time spent per project and per day, rounding each day up to whole quarters of an hour, and a heuristic for deciding which project got the extra quarter in case of ties. As many Exceptions and ASSERTs as I could come up with to sanity check the data along the way - which turned out to be indispensable when using a manual input file with strict data format criteria, including on how whitespace is used...

**Learnings:**
This was my first "real" Python project, my previous experience being limited to the code snippet written for the Zmanim project (see elsewhere on this page). Initial design input documentation; multi-file and multi-function architecture; 

_*) a better word here would probably be "requirement"; however, due to an occupational quirk, I usually reserve that term for design input context (in order to avoid confusion)._