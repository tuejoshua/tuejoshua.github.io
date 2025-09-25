<!--"Summary:" -->
<mark>[Here](tarpsKabale/TarpsKabale.html)</mark>* is my implementation of a patience/solitaire card game known in my family as "Tarps kabale"  
(it seems that the rest of the world might know it as "[Four Seasons](https://en.wikipedia.org/wiki/Four_Seasons_(card_game))").

As far as testing has shown, the game is fully functional — subject to the **Future improvements** listed below — although I'm still debating with my mother if one should really be able/allowed to move cards to the waste pile and back so freely...

**Motivation:**
Some of my earliest (and also later!) coding memories are of implementing analogue games like this one.
Besides the opportunity to "free" the game _concept_** from its earthly shackles of physical equipment (in this case, a proper physical game of cards), such an exercise also has other valuable qualities, making it one of my first suggestions to someone wanting to "get into coding":  
If you take a game whose _design_ — i.e. rules, mechanics, graphics etc. — is already well-known (at least to you!) and try to model it via programming,
you can focus on exactly that — _implementation_ — which will both help you keeping focus ([Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)), but also help you resist the temptation of tweaking the design (i.e. the game mechanics⚠️) rather than making a real attempt at overcoming difficult implementation challenges when they occur — and this is where you REALLY learn "how to code" 🤓. 

**Further rambling:**
At the time of this writing, about 3 years have passed since I implemented this card game.  
Thinking back to the early stages of my "coding life", I remember implementing Yahtzee (the dice game) over 20 years ago, also in front-end code (sadly, that project has been forever lost in time 😞)  
As far as I recall, I was already contemplating card games at that time also; and yet, this card game is the first I have actually ever implemented!  
_Why_, you might ask? _Complexity_, I would answer: Not only do dice have only 6 possible values (sides), where cards have at least 52 (4 suits x 13, not counting Jokers);  
but more importantly: Whereas the outcome of rolling a (true) die is completely random, not depending at all on past outcomes,  
a deck of cards has a _memory_ or _state_, which means you need to handle deck shuffling, keeping track of how many cards are left in the pile (and where the others went!), etc.  
In particular, I believe that the need for a card shuffling algorithm is where my early attempts at implementing a card game came to a halt: 
I couldn't figure out an algorithm by myself, was not (yet) so introduced into academia as to know how to _research_ such a problem, and - probably most importantly: The web was not yet as accessible to obtain "any knowledge you didn't know you needed" as it has since become.

**Learnings:**
Now - years later - looking back at the code, I remember being quite proud of the fact that where I had previously (mis)used arrays for all kinds of purposes in a fairly naive way, here, I figured out that using [LIFO/stacks](https://en.wikipedia.org/wiki/LIFO_(computing)) i.e. `push/pop` methods would be both conceptually correct AND make my life much simpler.  
I also felt proud - and I still do - about the idea that I wanted to also see the BOTTOM card of a stack, and that I was able to accomplish that very simply and elegantly with the `transform: rotate` and `translate` parameters.  
Finally, I remember spending quite some time getting the layout just right via `position: relative` and `absolute` (something that I need to brush up on again for future layout-tight projects like this)

**Future improvements:**
Trying to make sense of the code now (after 3 years) made me realize that the overall state of the code is "initial prototype", i.e. implementing everything but not very gracefully***.
As such, the whole code would benefit from major refactoring/cleanup (DRY); ideally into a more OOP-oriented design and/or based on a design documentation sketch-out (also not made yet) - and state machine sketching/clarification.
In any case, comments are lacking-

More specifically, ChatGPT has told me that
- enabling drag/drop of cards - which would be a huge improvement! - should not be so hard to obtain (even in vanilla CSS/JS), and
- my current card shuffling algorithm is biased (i.e. some permutations will occur more often than others) and should be replaced with the Fisher-Yates (Knuth) shuffle, the proper algorithm for this 🫣

*) source files can also be inspected [here (GitHub)](https://github.com/tuejoshua/tuejoshua.github.io/blob/main/tarpsKabale)  
**) Please remember to consider any copyrights on the actual game concept... I'm not an expert in that, so all I can say is: Be warned!  
***) By the way: prototype vs. PoC is a whole other interesting discussion in itself 🤓