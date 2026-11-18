/* Vee's Fractions: WELCOME PAGE (index.html) */
(function () {
  const { L, $, esc, setVoice } = Vee, s = L.start;
  document.title = L.title;
  $('#title').textContent = s.title;
  $('#sub').textContent = s.subtitle;
  $('#hello').textContent = s.text;
  $('#note').textContent = s.note;
  const withV = $('#sv'), noV = $('#sn');
  withV.textContent = s.withVoice; noV.textContent = s.noVoice;
  withV.href = noV.href = L.pages.explain;
  withV.addEventListener('click', () => setVoice(true));
  noV.addEventListener('click', () => setVoice(false));
})();
