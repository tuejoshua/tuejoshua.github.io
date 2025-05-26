<!-- **Summary:**  -->
A suite of edutainment games aimed at exercising one's knowledge of _Hilchot Brachot_ (Jewish law concerning blessings).  
**Disclaimer:** I take no responsibility for the halachic correctness of these games - as they say: _"Please refer to your local (Orthodox) rabbi."_  

Click <mark>[here](https://tuejoshua.github.io/hilchotBrachot)</mark> for the game suite main menu.

**Motivation:**  
When I was learning (the _Order of Priority/Precedence_ part of) these laws, I was having difficulty obtaining a logical understanding of them. Having to resort to memorization seemed unsatisfying, and I realized that I would have to "gamify" this knowledge somehow if I wanted to retain it.  
Once I had a working prototype, the following **goals** seemed an interesting challenge for further development:
- As interesting and accessible as possible for as wide a(n age and language skills) target audience as possible
- Tradeoff: as lightweight as possible (e.g. to accomodate slow connections) while making reasonable use of multimedia (for previous bullet point)
- Keeping everything client-side only, which serves several goals:
 - Respecting user privacy: user input (e.g. personal food preferences) and usage should not be transmitted
 - Minimizing server effort / bandwidth usage
 - Portability: (in principle) completely cachable / offline-usable  

Other games have since been added to the suite.
 
- Front-end only - no server-side logic or data collection

**Learnings:**  
This project taught me a lot about multi-page website architecture and navigation, [LocalStorage](https://en.wikipedia.org/wiki/Web_storage), how (onclick) events propagate in the DOM hierarchy, and more.