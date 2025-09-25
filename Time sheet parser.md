<!-- **Motivation:**  -->
_"Please log how many hours you've spent on each project per day."_  
Although such a request for time registration has been recurring — in varying forms — throughout my career, it took me quite some time and effort to make peace with it; even more so when it included naming the major tasks worked on (again, per-day).  
<!-- The following note was for the word DEMAND, but seems silly now that I'm using REQUEST instead: _*) a better word here would probably be "requirement"; however, due to an occupational quirk, I usually reserve that term for the design input context (in order to avoid confusion)._ -->

This is because I usually switch between many contexts throughout the day and can't remember — with adequate precision — what I did just half a day ago, and so, trying to guesstimate these numbers _at the end_ of the work day is very unsatisfying. I tried doing this time registration _throughout_ the day, but found that it made me ineffective in my REAL work by taking up significant mental bandwidth.

While discussing another topic with a colleague, I found out that the good ol' Windows app Notepad has a keyboard shortcut (F5) for logging the current date and time(stamp). After throwing together an unglamorous but very efficient tab-separated value format, I had a way of checking in and out of projects and tasks during the work day which I soon learned to do automatically. But now, I had a lot of minute-precision data points that needed digesting in order to get back to the original request. Time for automation! 😉

**Summary:**  
A Python-based tool compiled to an executable that I can run on my work PC, which reads the above-described timestamp file and outputs a CSV file containing time spent per project per day — plus a [pyplot](https://matplotlib.org/stable/tutorials/pyplot.html)* "dashboard" for visualizing statistics as additional sanity checks — and keeping track of how the current month's work is progressing.

<mark>_Unfortunately, the tool was developed partly on company time, so I cannot share its code.</mark> I may generate and share some sketches or other way of illustration in the future..._

Some **details** of interest:
- Using *regular expressions* for parsing the input file turned out to be a good solution, but also one that took some frustration to get working, and corresponding joy once it did — which always seems to be my experience when dabbling in that black art 🙃 
- Reducing the time resolution (from minutes to hours, as mentioned above), meant rounding the daily work time to whole hours and distributing these hours "fairly" between active projects. Achieving this "fairness" turned out to be quite the complex problem. In the end, I decided on an algorithm which distributes most of the hours automatically, but, in case of ties — which turned out to be more common than you might expect — relies on the user to choose which project gets the "last" hour. This trivial manual input is a small price to pay to avoid overengineering the algorithm to use knowledge of _adjacent_ work days to help determine the "fairest winner" (i.e. _"project X won the tie yesterday"_). <!-- Actually, I was rounding UP - no working for free here ;-) - and only to whole quarters of an hour per day (so max 14 minutes less work than pay) - although this is easily adjustable to something else, e.g. whole hours, which my employer suggested initially_ -->
- I added as many _Exceptions_ and _asserts_ as I could come up with to sanity check the data along the way — which turned out to be indispensable when using a manual input file with strict data format criteria, including on how whitespace is used...

**Learnings:**
Apart from the topics laid out above, this was also my first "real" Python project, my previous experience being limited to the code snippet written for the _Zmanim_ project (see elsewhere on this page). It also was a good exercise in documenting initial design inputs; multi-file and multi-function architecture.

**Future improvements:**
Although I also logged the major task names in the input file, the tool has yet to incorporate this information into its output (namely, detecting when the same task is worked on for several days) — for now, I have to import the CSV output file into a spreadsheet application, and then go through the input file manually 🙄 to add this information as additional spreadsheet columns.  
On the one hand, this improvement seems fairly trivial to implement — but on the other, I've seen in practice that I often end up rephrasing these task names anyway once I have the whole period in front of my eyes...

_*) Yay, MATLAB nostalgia from my university and algorithm developer days! 🤓_