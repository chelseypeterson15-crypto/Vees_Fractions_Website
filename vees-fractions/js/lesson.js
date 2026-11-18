/* Vee's Fractions: LESSON CONTENT.
   Everything Vee says, the examples, the accepted answers and the replies to mistakes live here.
   To make a tutorial on a different topic, change only this file. */
window.LESSON = {
  "title": "Vee’s Fractions",
  "tutor": {
    "name": "Vee",
    "about": "Named after the vinculum, the line in the middle of a fraction."
  },
  "messages": {
    "empty": "Fill in every box first, then press Check.",
    "wrong": "Not quite. Look at the box I'm pointing at. Stuck? Tap Hint.",
    "equalNotSimplest": "That's equal to the answer, but it can be simplified further. Look for a number that divides into both the top and the bottom.",
    "equalWrongForm": "Those fractions are the right size, but on this line both need the common denominator on the bottom.",
    "filled": "I've filled this line in for you. Read it through, make sure it makes sense, then press Check.",
    "hintPrefix": "Hint: ",
    "showMe": "Show me",
    "hint": "Hint",
    "check": "Check",
    "nextBox": "Next box",
    "next": "Next",
    "back": "Back",
    "nextLine": "Next line",
    "nextPart": "Next part",
    "again": "Start again",
    "voiceOn": "Voice on",
    "voiceOff": "Voice off",
    "start": "Start"
  },
  "explain": {
    "title": "Explain",
    "cards": [
      {
        "heading": "How to add fractions",
        "text": [
          "You can only add fractions when the pieces are the same size. Thirds and quarters aren't, so cut both into twelfths first."
        ],
        "bars": [
          {
            "n": 8,
            "d": 12,
            "label": "2/3 = 8/12"
          },
          {
            "n": 3,
            "d": 12,
            "label": "1/4 = 3/12"
          }
        ],
        "steps": [
          "**Common denominator:** a number both bottoms go into.",
          "**Convert:** multiply the top by the same as the bottom.",
          "**Add the tops.** The bottom stays the same.",
          "**Simplify** if you can."
        ],
        "tutor": "Hi, I'm Vee. Same-size pieces first, then add. Four steps. Next, watch me do one."
      }
    ]
  },
  "worked": {
    "title": "Watch",
    "problem": "1/6 + 1/10",
    "lines": [
      {
        "math": "1/6 + 1/10",
        "point": [
          0,
          2
        ],
        "say": "Here's one to watch. Sixths and tenths are different sizes, so first we need a common denominator.",
        "step": -1
      },
      {
        "math": "Common denominator: 30",
        "point": [
          2
        ],
        "say": "Count up in tens: 10, 20, 30. Is 30 in the 6 times table? Yes, 6 × 5 = 30. So 30 is the smallest number both go into. 60 would also work, but bigger numbers mean more work.",
        "step": 0
      },
      {
        "math": "= 5/30 + 3/30",
        "point": [
          1,
          3
        ],
        "say": "6 × 5 = 30, so multiply the top by 5 too: 1/6 = 5/30. And 10 × 3 = 30, so 1/10 = 3/30.",
        "step": 1
      },
      {
        "math": "= 8/30",
        "point": [
          1
        ],
        "say": "The pieces are the same size now, so add the tops: 5 + 3 = 8. The bottom stays 30.",
        "step": 2
      },
      {
        "math": "= 4/15",
        "point": [
          1
        ],
        "say": "8 and 30 are both even, so halve them both: 4/15. Nothing else divides into 4 and 15, so that's the answer.",
        "step": 3
      }
    ],
    "outro": "That's all four steps. Your turn next, and I'll check each line as you go."
  },
  "together": {
    "title": "Together",
    "problem": "3/10 + 1/6",
    "intro": "Let's do 3/10 + 1/6 together. First line: what's the smallest number both 10 and 6 go into?",
    "steps": [
      {
        "template": "Common denominator: {d}",
        "answer": {
          "d": 30
        },
        "mode": "exact",
        "right": "Yes, that's right. 30 is in the 10 and the 6 times tables.",
        "responses": [
          {
            "match": {
              "d": 60
            },
            "ok": true,
            "say": "60 works too, since it's 10 × 6. But 30 is smaller and keeps the numbers easier, so let's use 30."
          },
          {
            "match": {
              "d": 16
            },
            "say": "It looks like you added 10 and 6. We need a number that both 10 and 6 divide into."
          },
          {
            "match": {
              "d": 3
            },
            "say": "That's a number that goes into 6, not one that both go into. Think bigger."
          }
        ],
        "hints": [
          "Count up in tens: 10, 20, 30, 40…",
          "Which of those is also in the 6 times table?",
          "It's 30, because 10 × 3 = 30 and 6 × 5 = 30."
        ]
      },
      {
        "template": "= {a:f} + {b:f}",
        "prompt": "Now write both fractions over 30.",
        "answer": {
          "a": [
            9,
            30
          ],
          "b": [
            5,
            30
          ]
        },
        "mode": "exact",
        "right": "Yes, that's right. Both are now in thirtieths.",
        "responses": [
          {
            "match": {
              "a": [
                3,
                30
              ]
            },
            "say": "You changed the bottom of 3/10 but not the top. 10 × 3 = 30, so the top needs × 3 as well."
          },
          {
            "match": {
              "b": [
                1,
                30
              ]
            },
            "say": "You changed the bottom of 1/6 but not the top. 6 × 5 = 30, so the top needs × 5 as well."
          }
        ],
        "hints": [
          "What do you multiply 10 by to get 30? Do the same to the 3 on top.",
          "10 × 3 = 30, so 3/10 = 9/30. Now do 1/6: what do you multiply 6 by to get 30?",
          "It's 9/30 + 5/30."
        ]
      },
      {
        "template": "= {c:f}",
        "prompt": "Same-size pieces now. Add them.",
        "answer": {
          "c": [
            14,
            30
          ]
        },
        "mode": "exact",
        "right": "Yes, that's right. 9 + 5 = 14 thirtieths.",
        "responses": [
          {
            "match": {
              "c": [
                14,
                60
              ]
            },
            "say": "Only add the tops. Thirtieths plus thirtieths are still thirtieths, so the bottom stays 30."
          },
          {
            "match": {
              "c": [
                4,
                16
              ]
            },
            "say": "That adds the original tops and bottoms. Use the line above: 9/30 + 5/30."
          },
          {
            "match": {
              "c": [
                7,
                15
              ]
            },
            "say": "That's the right value, already simplified. Nice. For now, write the sum over 30 first, and we'll simplify on the next line."
          }
        ],
        "hints": [
          "Add the two tops: 9 + 5.",
          "The bottom stays 30.",
          "It's 14/30."
        ]
      },
      {
        "template": "= {e:f}",
        "prompt": "Last line: can 14/30 be simplified?",
        "answer": {
          "e": [
            7,
            15
          ]
        },
        "mode": "simplest",
        "right": "Yes, that's right. 7/15 is as simple as it gets.",
        "responses": [
          {
            "match": {
              "e": [
                14,
                30
              ]
            },
            "say": "That's the same as the line above. Is there a number that divides into both 14 and 30?"
          }
        ],
        "hints": [
          "14 and 30 are both even.",
          "Halve the top and halve the bottom.",
          "It's 7/15."
        ]
      }
    ],
    "outro": "Done: 3/10 + 1/6 = 7/15. Next, one on your own. I'll stay quiet unless you ask for a hint."
  },
  "own": {
    "title": "Alone",
    "problem": "2/15 + 1/6",
    "intro": "Your turn: 2/15 + 1/6. Same four lines. Tap Hint whenever you want one.",
    "steps": [
      {
        "template": "Common denominator: {d}",
        "answer": {
          "d": 30
        },
        "mode": "exact",
        "right": "Yes, 30.",
        "responses": [
          {
            "match": {
              "d": 90
            },
            "ok": true,
            "say": "90 works, since it's 15 × 6. 30 is smaller though, so we'll use 30."
          },
          {
            "match": {
              "d": 21
            },
            "say": "It looks like you added 15 and 6. We need a number both divide into."
          }
        ],
        "hints": [
          "Count up in fifteens: 15, 30, 45…",
          "Which of those is in the 6 times table?",
          "It's 30."
        ]
      },
      {
        "template": "= {a:f} + {b:f}",
        "answer": {
          "a": [
            4,
            30
          ],
          "b": [
            5,
            30
          ]
        },
        "mode": "exact",
        "right": "Yes, that's right.",
        "responses": [
          {
            "match": {
              "a": [
                2,
                30
              ]
            },
            "say": "You changed the bottom of 2/15 but not the top. 15 × 2 = 30, so the top needs × 2 as well."
          },
          {
            "match": {
              "b": [
                1,
                30
              ]
            },
            "say": "You changed the bottom of 1/6 but not the top. 6 × 5 = 30, so the top needs × 5 as well."
          }
        ],
        "hints": [
          "15 × 2 = 30. Do the same to the top.",
          "6 × 5 = 30. Do the same to the top.",
          "It's 4/30 + 5/30."
        ]
      },
      {
        "template": "= {c:f}",
        "answer": {
          "c": [
            9,
            30
          ]
        },
        "mode": "exact",
        "right": "Yes, that's right.",
        "responses": [
          {
            "match": {
              "c": [
                9,
                60
              ]
            },
            "say": "Only add the tops. The bottom stays 30."
          },
          {
            "match": {
              "c": [
                3,
                21
              ]
            },
            "say": "That adds the original tops and bottoms. Use the line above."
          },
          {
            "match": {
              "c": [
                3,
                10
              ]
            },
            "say": "Right value, already simplified. Write it over 30 first; simplifying is the next line."
          }
        ],
        "hints": [
          "Add the tops: 4 + 5.",
          "The bottom stays 30.",
          "It's 9/30."
        ]
      },
      {
        "template": "= {e:f}",
        "answer": {
          "e": [
            3,
            10
          ]
        },
        "mode": "simplest",
        "right": "Yes, that's right.",
        "responses": [
          {
            "match": {
              "e": [
                9,
                30
              ]
            },
            "say": "That's the same as the line above. What divides into both 9 and 30?"
          }
        ],
        "hints": [
          "9 and 30 are both in the 3 times table.",
          "Divide the top and the bottom by 3.",
          "It's 3/10."
        ]
      }
    ],
    "outro": "2/15 + 1/6 = 3/10. You did that on your own. Common denominator, convert, add the tops, simplify: that works for any two fractions."
  },
  "start": {
    "title": "Vee’s Fractions",
    "subtitle": "Adding fractions with different denominators",
    "text": "Five minutes, four steps, one new skill. I'm Vee. I'll show you, then we'll do one together, then you'll do one on your own.",
    "withVoice": "Start with voice",
    "noVoice": "Start without voice",
    "note": "You can turn the voice on or off at any time."
  },
  "stepNames": [
    "Common denominator",
    "Convert",
    "Add the tops",
    "Simplify"
  ],
  "pages": {
    "explain": "explain.html",
    "worked": "watch.html",
    "together": "together.html",
    "own": "alone.html",
    "home": "index.html"
  }
};
