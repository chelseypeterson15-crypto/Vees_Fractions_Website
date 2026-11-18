# Vee's Fractions

An interactive, phone-first tutorial that teaches adding fractions with different denominators to learners aged 13 to 16.

## How to open it

Double-click `index.html`. It opens in your browser like any website, with no server or install needed.

## Pages

| Page | What it is | Its code |
| --- | --- | --- |
| `index.html` | Welcome: meet Vee, choose voice on or off | `js/welcome.js` |
| `explain.html` | Part 1: Explain | `js/explain.js` |
| `watch.html` | Part 2: Watch a worked example | `js/watch.js` |
| `together.html` | Part 3: Try one together | `js/together.js` + `js/practice.js` |
| `alone.html` | Part 4: On your own | `js/alone.js` + `js/practice.js` |

## Shared files

| File | What it is |
| --- | --- |
| `js/lesson.js` | **All the content**: everything Vee says, the examples, the accepted answers and the replies to mistakes |
| `js/common.js` | Shared code: Vee's bar, voice, tabs, buttons and the arrow |
| `js/practice.js` | Shared practice engine: fill-in boxes, keypad, checking lines, hints |
| `css/style.css` | All the styling, for phone and laptop |
| `assets/` | Vee drawings as SVG |

To make a tutorial on a different topic, change only `js/lesson.js`.

## Voice

Vee uses Microsoft Sonia (British English, natural) at 0.9 speed where the device has it, otherwise the most natural English voice available. Voice is off until the learner turns it on, and the words are always on screen.
