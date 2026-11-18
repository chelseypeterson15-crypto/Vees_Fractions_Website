# Vee's Fractions

An interactive, phone-first maths tutorial that teaches learners aged 13–16 how to add fractions with different denominators, guided by a friendly tutor called Vee.

Live site: https://veesfractions.vercel.app/

How the lesson works
Explain: the main idea on one screen. Make the pieces the same size, then add the tops.
Watch: Vee solves an example line by line.
Try one together: the learner types each line and gets feedback on every line.
On your own: a new question with the same steps.
Features
Every line the learner types is checked in code. Vee's arrow points to the exact box that's wrong.
Help is always available: three hints, then Show me, so there are no dead ends.
Optional voice (Microsoft Sonia, UK English, speed 0.9). The text is always on screen, and the voice never auto-plays and can be muted.
Readable contrast, large tap targets, and mistakes shown with words and an arrow, not just colour.
No points, badges or streaks. No login and no AI. Front end only.
How to run it
Online: open the live link.
On your computer: open the vees-fractions folder and double-click index.html. No install or server needed.
Project structure
vees-fractions/
├── index.html        Welcome page
├── explain.html      Part 1: Explain
├── watch.html        Part 2: Watch
├── together.html     Part 3: Try one together
├── alone.html        Part 4: On your own
├── css/style.css     All styling (phone and laptop)
└── js/
    ├── lesson.js     ALL lesson content (separate from the code)
    ├── common.js     Shared code: voice, tutor bar, buttons, arrow
    ├── practice.js   Answer checking, keypad, hints
    └── (one script per page)

To change the questions or Vee's words, edit only js/lesson.js.

Built with

HTML, CSS and JavaScript, and the Web Speech API for the voice.
