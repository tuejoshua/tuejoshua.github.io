As stated above,
> This page presents a curated collection of projects that I've done 
  — for future inspiration, personal nostalgia, and sharing.

Like most of my other projects, it started simple and evolved over time.  
Being a "meta-project", it took me longer than usual to accept that it had become untrivial and therefore an actual project in its own right whose development process I wanted to describe.  
As a result, the following is written even more in hindsight than for my other projects 🫣

### Complexity  
Initially **a single (HTML) file** containing everything, this page has split into more and more smaller and smaller files over time.  
Wanting to edit the project descriptions (**data**) separately from the page layout (**structure**) itself, I first moved the former into a `JSON` file — and then realized that that format is not very well-suited for the prose I was writing (some of which you are reading right now). As a result, I moved that part of the data further into separate `Markdown` files (one for each project).

Here's the current state of [the JSON file](https://github.com/tuejoshua/tuejoshua.github.io/blob/main/projects.json) and [one of the Markdown files](<https://github.com/tuejoshua/tuejoshua.github.io/blob/main/projects/Projects showcase (this page).md>).
Both are of course changing over time as I add/update project descriptions.

...

At some point, other websites inspired me to implement the good(?) practice of warning the user when clicking an "external" hyperlink, i.e. when the destination/content is not under my control or responsibility.
To see how that works, click e.g. any link under the _Acknowledgements_ section towards the bottom of this page  
(incidentally, that section also has more details about 3rd party technologies that this site was built on top of.)

### Hosting  
Initially, I had everything hosted in a free web hotel<!-- tuejoshua.atwebpages.com (hosted by awardspace.com) -->.
Since no payment traditionally equals no `HTTPS` certificates, content from such domains is served over the less secure `HTTP` protocol.
In my earliest days of [hacking (in the creative, exploratory sense)](https://en.wikipedia.org/wiki/Hacker), only experts even knew about this distinction, but nowadays, modern browsers warn the user so aggressively about this that the average user ~~would~~ _should_ follow the browser's advice of aborting the page visit.
This is of course not good [usability](https://en.wikipedia.org/wiki/Usability) (to say the least), so I had to come up with a better solution.

---

I don't remember exactly (and am too lazy to find out) what came first:
- Starting to use `GitHub` for [VC](https://en.wikipedia.org/wiki/Version_control) of all my code projects (previously, I didn't do VC at all),  
or
- Realizing that `GitHub Pages` was a good solution to my hosting troubles (since it offers `HTTPS` even for free accounts.) 

...possibly, they happened at the same time.  

However, unlike my previous web hotel, GitHub Pages does not support (dynamic content like) PHP pages, so I had to find another solution for such outputs.  
Eventually, I realized that I could use `iframe`s to embed the PHP pages (still hosted in the initial web hotel) into ("wrapper") pages in the GitHub Pages domain, thereby hiding the `HTTP(S)` complexity from the end user.
I named such pages ".php.html" to indicate that they were in fact just such wrapper pages for .php pages hosted elsewhere.

Unfortunately, this solution only worked briefly (for about a year, if I remember correctly), before the evolution of browsers made them "even safer" by not allowing `iframe`s of `HTTPS` pages to refer to `HTTP`-hosted content.

In the end (until browser evolution defeats me yet again 🫣), I came up with another solution  
\- for a practical example, go to any one of the projects on this list with a PHP logo, and see what happens. 

<!--
### Design choices
It's a general design choice to make all (/as much as possible) text on the site selectable, e.g. to enable translation
--> 

### Future improvements
- At *this* time of writing, the content of this page - besides that already in Markdown files - is implementing a sort of pseudo-Markdown format, where e.g. hyperlinks can be written more human readable, while some JS code parses that appropriately. This is unneccesarily complex; in the future, we want to move that content to Markdown files also.
- **Footnotes**: My current footnote system (see right above this section for an example) is quite crude. (The Markdown parser I'm using, and otherwise very happy with, does not implement such a feature, so I would probably have to implement some postprocessing of the parser output...)
- Along a similar vein, **`code formatting`** (via backticks) doesn't look nice with my current fonts...
- When expanding a project description, maybe the screen should **auto-scroll** to it and/or the others automatically close?  
  Also, floating buttons for jumping to next/previous project?
- Maybe redirect unexpected URLs in the PHP-domain - including the root - to the GitHub Pages?
- Implement linking between projects (when they refer to each other)
- An icon next to every hyperlink, indicating destination file type and/or Favicon