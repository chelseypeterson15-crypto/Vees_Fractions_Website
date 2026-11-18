/* Vee's Fractions: PRACTICE ENGINE, shared by Part 3 (together.html) and Part 4 (alone.html).
   Draws the fill-in boxes and keypad, checks each line, and gives hints. */
Vee.practice = function (k) {
  const { L, M, $, esc, frac, say, steps, probRow, navBtns, drawArrow, startPage, markDone, store } = Vee;
  const D = L[k];
  const ps = { step: 0, done: [], hint: 0, cur: {}, bad: [], badp: {}, said: null };
  let focus = null, lastSaid = '';
  startPage(k);

  /* ---------- reading the line templates in lesson.js ---------- */
  const slotRe = /^\{(\w+)(:f)?\}$/;
  const slots = tpl => tpl.split(' ').filter(t => slotRe.test(t)).map(t => { const m = t.match(slotRe); return { k: m[1], f: !!m[2] }; });
  const cells = st => { const out = []; slots(st.template).forEach(s => { if (s.f) { out.push([s.k, 'n']); out.push([s.k, 'd']); } else out.push([s.k, 'v']); }); return out; };
  function lineHTML(tpl, vals, active) {
    return tpl.split(' ').map(t => {
      const m = t.match(slotRe);
      if (!m) return `<span class="tk${/[a-z]/i.test(t) ? ' lab' : ''}">${esc(t)}</span>`;
      const s = m[1];
      if (!active) { const v = vals[s]; return Array.isArray(v) ? frac(v[0], v[1]) : `<span class="tk">${v}</span>`; }
      const c = (p, lab) => {
        const on = focus && focus[0] === s && focus[1] === p;
        const bad = ps.bad.includes(s) && !(ps.badp[s] && ps.badp[s] !== p);
        return `<button class="cell${on ? ' on' : ''}${bad ? ' bad' : ''}" data-k="${s}" data-p="${p}" aria-label="${lab}">${esc((ps.cur[s] || {})[p] || '')}</button>`;
      };
      return m[2] ? `<span class="fr in">${c('n', 'top')}<span class="vb"></span>${c('d', 'bottom')}</span>` : c('v', 'number');
    }).join('');
  }

  /* ---------- draw the page ---------- */
  function render() {
    const S = $('#stage'), fin = ps.step >= D.steps.length;
    let h = steps(fin ? 4 : ps.step) + probRow(D.problem, k === 'own' ? 'On your own:' : 'Together:') + '<div class="work">';
    ps.done.forEach((v, i) => h += `<div class="ln okl">${lineHTML(D.steps[i].template, v, false)}</div>`);
    if (!fin) { const st = D.steps[ps.step]; if (!focus) focus = cells(st)[0]; h += `<div class="ln cur">${lineHTML(st.template, null, true)}</div>`; }
    S.innerHTML = h + '</div>'; S.scrollTop = S.scrollHeight;
    S.querySelectorAll('.cell').forEach(b => b.onclick = () => { focus = [b.dataset.k, b.dataset.p]; render(); });
    if (!ps.said) ps.said = [D.intro];
    if (ps.said[0] !== lastSaid) { lastSaid = ps.said[0]; say(ps.said[0], ps.said[1]); }

    if (fin) {
      markDone(k); Vee.tabs(k);
      if (k === 'own') navBtns(L.pages.together, M.again, () => { const v = store.get('voice'); store.clear(); if (v) store.set('voice', v); location.href = L.pages.home; });
      else navBtns(L.pages.worked, M.nextPart, L.pages.own);
      drawArrow(); return;
    }
    const st = D.steps[ps.step], hl = ps.hint >= st.hints.length ? M.showMe : M.hint;
    $('#ctl').innerHTML = `<div class="kp">${[1, 2, 3].map(n => `<button data-d="${n}">${n}</button>`).join('')}<button data-a="del" aria-label="Delete">⌫</button>
      ${[4, 5, 6].map(n => `<button data-d="${n}">${n}</button>`).join('')}<button class="w" data-a="nx">${esc(M.nextBox)}</button>
      ${[7, 8, 9].map(n => `<button data-d="${n}">${n}</button>`).join('')}<button class="w" data-a="hint">${esc(hl)}</button>
      <button data-d="0" class="z">0</button><button class="pri" data-a="chk">${esc(M.check)}</button></div>`;
    $('#ctl').querySelectorAll('button').forEach(b => b.onclick = () => b.dataset.d != null ? type(b.dataset.d) : act(b.dataset.a));
    drawArrow();
  }

  /* ---------- keypad ---------- */
  function type(d) {
    if (!focus) return; const [s, p] = focus; ps.cur[s] = ps.cur[s] || {};
    const v = ps.cur[s][p] || ''; if (v.length < 3) ps.cur[s][p] = v + d; ps.bad = ps.bad.filter(x => x !== s); render();
  }
  function act(a) {
    const st = D.steps[ps.step]; if (!st) return;
    if (a === 'del') { if (!focus) return; const [s, p] = focus; const o = ps.cur[s] || {}; o[p] = (o[p] || '').slice(0, -1); ps.cur[s] = o; render(); }
    else if (a === 'nx') { const c = cells(st); const i = c.findIndex(x => focus && x[0] === focus[0] && x[1] === focus[1]); focus = c[(i + 1) % c.length]; render(); }
    else if (a === 'hint') {
      if (ps.hint < st.hints.length) { ps.said = [M.hintPrefix + st.hints[ps.hint]]; ps.hint++; }
      else { ps.cur = {}; for (const s in st.answer) { const v = st.answer[s]; ps.cur[s] = Array.isArray(v) ? { n: String(v[0]), d: String(v[1]) } : { v: String(v) }; } ps.bad = []; ps.said = [M.filled]; }
      render();
    }
    else if (a === 'chk') check();
  }

  /* ---------- checking a line ---------- */
  function read(st) {
    const vals = {};
    for (const s of slots(st.template)) { const c = ps.cur[s.k] || {};
      if (s.f) { const n = parseInt(c.n, 10), d = parseInt(c.d, 10); if (isNaN(n) || isNaN(d)) return null; vals[s.k] = [n, d]; }
      else { const v = parseInt(c.v, 10); if (isNaN(v)) return null; vals[s.k] = v; } }
    return vals;
  }
  const same = (a, b) => Array.isArray(a) ? Array.isArray(b) && a[0] === b[0] && a[1] === b[1] : a === b;
  const eqv = (a, b) => Array.isArray(a) && Array.isArray(b) && a[1] !== 0 && a[0] * b[1] === b[0] * a[1];
  const badParts = (v, ans) => { if (!Array.isArray(v)) return null; if (v[0] !== ans[0] && v[1] === ans[1]) return 'n'; if (v[1] !== ans[1] && v[0] === ans[0]) return 'd'; return null; };
  function judge(st, vals) {
    for (const r of st.responses || []) if (Object.keys(r.match).every(s => same(vals[s], r.match[s]))) return { ok: !!r.ok, say: r.say, bad: r.ok ? [] : Object.keys(r.match) };
    const wrong = Object.keys(st.answer).filter(s => !same(vals[s], st.answer[s]));
    if (!wrong.length) return { ok: true, say: st.right };
    if (wrong.every(s => eqv(vals[s], st.answer[s]))) return { ok: false, say: st.mode === 'simplest' ? M.equalNotSimplest : M.equalWrongForm, bad: wrong };
    return { ok: false, say: M.wrong, bad: wrong };
  }
  function check() {
    const st = D.steps[ps.step], vals = read(st);
    if (!vals) { ps.said = [M.empty]; return render(); }
    const r = judge(st, vals);
    if (r.ok) { ps.done.push(st.answer); ps.step++; ps.cur = {}; ps.hint = 0; ps.bad = []; ps.badp = {}; focus = null;
      const nx = D.steps[ps.step]; ps.said = [r.say + ' ' + (nx ? (nx.prompt || '') : D.outro)]; }
    else { ps.bad = r.bad; ps.badp = {}; r.bad.forEach(s => { const bp = badParts(vals[s], st.answer[s]); if (bp) ps.badp[s] = bp; }); ps.said = [r.say, 'bad']; }
    render();
  }

  /* ---------- laptop keyboard ---------- */
  document.addEventListener('keydown', e => {
    if (/^[0-9]$/.test(e.key)) { type(e.key); e.preventDefault(); }
    else if (e.key === 'Backspace') { act('del'); e.preventDefault(); }
    else if (e.key === 'Tab' || e.key === '/') { act('nx'); e.preventDefault(); }
    else if (e.key === 'Enter' && !(e.target.closest && e.target.closest('#ctl,#parts,header'))) { act('chk'); e.preventDefault(); }
  });

  render();
};
