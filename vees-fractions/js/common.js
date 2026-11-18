/* Vee's Fractions: SHARED CODE used by every page.
   Tutor bar, voice, tabs, buttons, fractions and the arrow that points at mistakes. */
window.Vee = (function () {
  const L = window.LESSON, M = L.messages;
  const ORDER = ['explain', 'worked', 'together', 'own'];
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const frac = (n, d) => `<span class="fr" aria-label="${n} over ${d}"><span>${n}</span><span>${d}</span></span>`;
  const rich = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(\d+)\/(\d+)/g, (m, n, d) => frac(n, d));
  const isF = t => /^\d+\/\d+$/.test(t);
  let last = '';

  /* ---------- remembered between pages ---------- */
  const store = {
    get(k) { try { return localStorage.getItem('vee_' + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('vee_' + k, v); } catch (e) {} },
    clear() { try { Object.keys(localStorage).filter(k => k.startsWith('vee_')).forEach(k => localStorage.removeItem(k)); } catch (e) {} }
  };

  /* ---------- voice: Sonia (en-GB) at 0.9, else the most natural voice on the device ---------- */
  const ORD = { 2: 'half', 3: 'third', 4: 'quarter', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', 11: 'eleventh', 12: 'twelfth', 13: 'thirteenth', 14: 'fourteenth', 15: 'fifteenth', 16: 'sixteenth', 18: 'eighteenth', 20: 'twentieth', 21: 'twenty-first', 24: 'twenty-fourth', 30: 'thirtieth', 60: 'sixtieth', 90: 'ninetieth' };
  const fracWords = (n, d) => { const w = ORD[d]; if (!w) return n + ' over ' + d; if (+n === 1) return 'one ' + w; return n + ' ' + (w === 'half' ? 'halves' : w + 's'); };
  const RATE = 0.9;
  let voiceOn = store.get('voice') === 'on', bestVoice = null;
  function scoreVoice(v) {
    const n = v.name.toLowerCase(), l = (v.lang || '').toLowerCase(); if (!l.startsWith('en')) return -99; let s = 0;
    if (/sonia/.test(n)) s += 50;
    if (/\b(david|mark|george|ryan|guy|luke|daniel|james|thomas|oliver|alex|fred|male)\b/.test(n) && !/female/.test(n)) s -= 20;
    if (/female|zira|hazel|susan|libby|maisie|leah|aria|jenny|samantha|karen|moira|tessa|serena|kate|catherine/.test(n)) s += 5; if (/libby|maisie|serena|kate|female/.test(n) && l === 'en-gb') s += 4;
    if (/natural|neural/.test(n)) s += 6; if (/premium|enhanced/.test(n)) s += 4; if (/online/.test(n)) s += 3; if (/google/.test(n)) s += 3;
    if (/espeak|compact|novelty|robot/.test(n)) s -= 6; if (l === 'en-gb') s += 3; else if (l === 'en-za') s += 1; return s;
  }
  function pickVoice() { try { const vs = speechSynthesis.getVoices(); if (vs.length) { bestVoice = vs.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a))[0]; if (scoreVoice(bestVoice) < -50) bestVoice = null; } } catch (e) {} }
  let pending = null, waited = false;
  function voicesReady() { pickVoice(); if (pending !== null && bestVoice) { const t = pending; pending = null; speakNow(t); } }
  if ('speechSynthesis' in window) { pickVoice(); try { speechSynthesis.onvoiceschanged = voicesReady; } catch (e) {} }
  const speakable = t => t.replace(/\*\*/g, '').replace(/(\d+)\/(\d+)/g, (m, n, d) => fracWords(n, d)).replace(/×/g, ' times ').replace(/ = /g, ' equals ').replace(/ \+ /g, ' plus ').replace(/✓|✗/g, '').replace(/…/g, '.');
  function speakNow(text) {
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(speakable(text)); if (bestVoice) { u.voice = bestVoice; u.lang = bestVoice.lang; } u.rate = RATE; speechSynthesis.speak(u); } catch (e) {}
  }
  /* wait until the device's voices have loaded, so Vee always uses the same voice */
  function speak(text) {
    if (!voiceOn || !('speechSynthesis' in window)) return;
    if (!bestVoice) pickVoice();
    if (bestVoice || waited) { speakNow(text); return; }
    pending = text;
    setTimeout(() => { waited = true; if (pending !== null) { pickVoice(); const t = pending; pending = null; speakNow(t); } }, 1500);
  }
  function setVoice(on) {
    voiceOn = on; store.set('voice', on ? 'on' : 'off');
    const b = $('#voice'); if (b) { b.textContent = on ? M.voiceOn : M.voiceOff; b.setAttribute('aria-pressed', on); }
    if (!on && 'speechSynthesis' in window) speechSynthesis.cancel();
  }

  /* ---------- Vee's bar ---------- */
  function say(text, mood) {
    last = text; const b = $('#bub'); b.style.animation = 'none'; b.offsetHeight; b.style.animation = ''; b.innerHTML = rich(text);
    $('#mouth').setAttribute('d', mood === 'bad' ? 'M38 70 Q48 64 58 70' : 'M38 66 Q48 74 58 66'); speak(text);
  }

  /* ---------- shared pieces ---------- */
  function mathLine(str, point = []) {
    return str.split(' ').map((t, i) => { const pt = point.includes(i) ? ' pt' : '';
      if (isF(t)) { const [n, d] = t.split('/'); return `<span class="tk${pt}">${frac(n, d)}</span>`; }
      return `<span class="tk${pt}${/[a-z]/i.test(t) ? ' lab' : ''}">${esc(t)}</span>`; }).join('');
  }
  const steps = cur => '<div class="steps">' + L.stepNames.map((n, i) => `<div class="st ${i < cur ? 'done' : i === cur ? 'cur' : ''}"><b>${i < cur ? '✓' : i + 1}</b><span>${esc(n)}</span></div>`).join('') + '</div>';
  const probRow = (p, label) => `<div class="prob">${esc(label)} <span class="m">${mathLine(p)}</span></div>`;
  const isDone = k => store.get('done_' + k) === '1';
  const markDone = k => store.set('done_' + k, '1');

  /* tabs: each part is its own page */
  function tabs(current) {
    $('#parts').innerHTML = ORDER.map((k, i) => `<a href="${L.pages[k]}" class="${k === current ? 'on' : ''}${isDone(k) ? ' done' : ''}"${k === current ? ' aria-current="page"' : ''}>${i + 1}. ${esc(L[k].title)}</a>`).join('');
  }
  /* Back / Next: a page name (string) goes to that page, a function runs */
  function navBtns(back, nextLabel, next) {
    $('#ctl').innerHTML = `<div class="nav"><button id="bk">${esc(M.back)}</button><button id="nx" class="pri">${esc(nextLabel)}</button></div>`;
    const go = x => typeof x === 'string' ? () => { location.href = x; } : x;
    $('#bk').onclick = go(back); $('#nx').onclick = go(next);
  }

  /* arrow from Vee to the wrong box */
  function drawArrow() {
    const svg = $('#arrow'); if (!svg) return; const bad = $('#stage .cell.bad');
    if (!bad) { svg.style.display = 'none'; return; }
    svg.style.display = ''; const A = $('#app').getBoundingClientRect(), a = $('#avw').getBoundingClientRect(), b = bad.getBoundingClientRect(), T = $('#tutor').getBoundingClientRect();
    const x2 = b.left - A.left - 6, y2 = b.top - A.top + b.height / 2;
    if (innerWidth >= 900) { $('#ap').setAttribute('d', `M${T.right - A.left + 6} ${y2} L ${x2} ${y2}`); return; }
    const x1 = a.left - A.left + a.width / 2, y1 = T.bottom - A.top + 2, ex = 7;
    $('#ap').setAttribute('d', `M${x1} ${y1} Q ${ex} ${y1 + 4}, ${ex} ${y1 + 30} L ${ex} ${Math.max(y1 + 30, y2 - 18)} Q ${ex} ${y2}, ${x2} ${y2}`);
  }

  /* set up the parts of the page every lesson page shares */
  function startPage(current) {
    document.title = L[current].title + ' · ' + L.title;
    tabs(current); setVoice(voiceOn);
    $('#voice').onclick = () => { setVoice(!voiceOn); if (voiceOn) speak(last); };
    const st = $('#stage'); if (st) st.addEventListener('scroll', drawArrow); addEventListener('resize', drawArrow);
  }

  return { L, M, $, esc, frac, rich, say, setVoice, mathLine, steps, probRow, navBtns, drawArrow, startPage, markDone, store, tabs };
})();
