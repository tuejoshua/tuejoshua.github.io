<!--

I wanted to get deeper into test automation.

WEB test automation seems like a sensible choice, since I already have a lot of pages/code on this site, which would serve fine as the target*.
_*) Due to my medical device development carreer, I'm tempted to call this "design output"_

(I also really want to get back into UNIT CODE automation, but that's for another time/project...)

Of the 2 major players (the other being Selenium) Playwright seems to be "the choice of the future".
Also easier to get into - and with my other coding experience, I don't fear I'm missing out on the less steep learning curve ;)

So, very straightforward to set up, following [the official Playwright for VS Code guide](https://playwright.dev/docs/getting-started-vscode).

Playwright Syntax...
Aha-moment: Having to learn the Validation/accessibility focus over my assumed Verification do.:
https://chatgpt.com/c/68ecff76-e700-832f-894e-27a5f067e08c

...but WHAT to test? "Text strings being present in page headings" like in example.spec.ts...???

=> If I can use this for automation of W3C validation!!!

Validate all pages on my website on demand,
where
validate = according to https://validator.w3.org/ (which also links to https://www.w3.org/developers/tools/...?)
all pages = i.e. we need to traverse the site(map) somehow...
on demand = i.e. ready for later CI/CD??? enabling


https://www.w3.org/TR/accname-1.2/

** TODO: Read playwright website pages: **
- Agents aka. AI - let's try playing with that. I'm wary ;)
- Got to: Command Line'

-->