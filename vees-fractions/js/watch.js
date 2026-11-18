/* Vee's Fractions: PART 2, WATCH A WORKED EXAMPLE (watch.html) */
(function () {
  const { L, M, $, say, mathLine, steps, navBtns, startPage, markDone } = Vee;
  const W = L.worked;
  let idx = 0;
  startPage('worked');

  function show() {
    const line = W.lines[idx], lastLine = idx === W.lines.length - 1;
    $('#stage').innerHTML = steps(lastLine ? 4 : line.step) + '<div class="work">' +
      W.lines.slice(0, idx + 1).map((l, i) => `<div class="ln${i === idx ? ' cur' : ''}">${mathLine(l.math, i === idx ? l.point : [])}</div>`).join('') + '</div>';
    $('#stage').scrollTop = $('#stage').scrollHeight;
    say(line.say + (lastLine ? ' ' + W.outro : ''));
    navBtns(
      idx > 0 ? () => { idx--; show(); } : L.pages.explain,
      lastLine ? M.nextPart : M.nextLine,
      lastLine ? () => { markDone('worked'); location.href = L.pages.together; } : () => { idx++; show(); }
    );
  }
  show();
})();
