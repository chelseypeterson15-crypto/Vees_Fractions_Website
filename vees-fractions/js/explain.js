/* Vee's Fractions: PART 1, EXPLAIN (explain.html) */
(function () {
  const { L, M, $, esc, rich, say, navBtns, startPage, markDone } = Vee;
  const cards = L.explain.cards;
  let idx = 0;
  startPage('explain');

  function show() {
    const c = cards[idx];
    let h = `<h2 class="title">${esc(c.heading)}</h2>`;
    (c.text || []).forEach(t => h += `<p class="pp">${rich(t)}</p>`);
    if (c.bars) h += '<div class="bars">' + c.bars.map(b => `<div class="bar"><span class="bl">${rich(b.label)}</span><span class="segs" aria-label="${b.n} of ${b.d} parts shaded">${Array.from({ length: b.d }, (_, j) => `<i class="${j < b.n ? 'f' : ''}"></i>`).join('')}</span></div>`).join('') + '</div>';
    if (c.steps) h += '<ol class="method">' + c.steps.map(s => `<li>${rich(s)}</li>`).join('') + '</ol>';
    $('#stage').innerHTML = h;
    say(c.tutor);
    const lastCard = idx === cards.length - 1;
    navBtns(
      idx > 0 ? () => { idx--; show(); } : L.pages.home,
      lastCard ? M.nextPart : M.next,
      lastCard ? () => { markDone('explain'); location.href = L.pages.worked; } : () => { idx++; show(); }
    );
  }
  show();
})();
