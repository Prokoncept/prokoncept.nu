/* Shared consent UI. Analytics remains opt-in and is connected only by the local adapter. */
(() => {
  'use strict';
  if (window.ProkonceptConsent) return;
  const key = 'prokoncept-statistics-v11';
  const read = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const ui = document.createElement('div');
  ui.className = 'cookie-ui';
  ui.innerHTML = `
    <button class="cookie-settings-trigger pk-statistics-settings" type="button" aria-haspopup="dialog">Cookies</button>
    <dialog class="cookie-banner pk-statistics" aria-labelledby="cookie-title">
      <div class="cookie-banner-copy">
        <p class="cookie-kicker">DIT VALG</p>
        <h2 id="cookie-title">Vi passer på dine oplysninger</h2>
        <p>Med dit samtykke bruger vi statistik om sider, demoer og spørgeskemaer samt anslået land og by til at forbedre hjemmesiden. Du kan altid ændre dit valg igen.</p>
        <p><a href="cookies.html">Læs om cookies og statistik →</a></p>
      </div>
      <div class="cookie-custom" hidden>
        <p class="cookie-kicker">COOKIEINDSTILLINGER</p>
        <h2 id="cookie-custom-title">Vælg hvad du vil tillade</h2>
        <p>Statistik aktiveres først, når du giver samtykke. <a href="cookies.html">Læs den fulde forklaring →</a></p>
        <div class="cookie-category"><div><h3>Nødvendig lokal lagring</h3><p>Husker dit cookievalg i denne browser.</p></div><span>Altid aktiv</span></div>
        <label class="cookie-category"><span><span class="cookie-category-title">Statistik</span><span class="cookie-category-description">Valgfri statistik om brugen af hjemmesiden.</span></span><input id="cookie-analytics" type="checkbox" aria-label="Tillad statistik"></label>
      </div>
      <div class="cookie-actions">
        <button class="cookie-button secondary" type="button" data-cookie-action="reject">Afvis alle</button>
        <button class="cookie-button secondary" type="button" data-cookie-action="settings">Tilpas</button>
        <button class="cookie-button secondary" type="button" data-cookie-action="save" hidden>Gem mit valg</button>
        <button class="cookie-button primary" type="button" data-cookie-action="accept">Accepter alle</button>
      </div>
    </dialog>`;
  document.body.append(ui);
  const dialog = ui.querySelector('dialog'), trigger = ui.querySelector('.cookie-settings-trigger');
  const copy = ui.querySelector('.cookie-banner-copy'), custom = ui.querySelector('.cookie-custom');
  const show = (settings = false) => {
    copy.hidden = settings; custom.hidden = !settings;
    ui.querySelector('[data-cookie-action="settings"]').hidden = settings;
    ui.querySelector('[data-cookie-action="save"]').hidden = !settings;
    ui.querySelector('#cookie-analytics').checked = read() === 'yes';
    dialog.setAttribute('aria-labelledby', settings ? 'cookie-custom-title' : 'cookie-title');
    if (!dialog.open) dialog.showModal();
  };
  const hide = () => { if (dialog.open) dialog.close(); };
  const choose = value => {
    try { localStorage.setItem(key, value); } catch { /* Choice still applies to this page. */ }
    window.dispatchEvent(new CustomEvent('prokoncept:consent', { detail: value }));
    hide(); trigger.focus();
  };
  ui.addEventListener('click', event => {
    const action = event.target.closest('[data-cookie-action]')?.dataset.cookieAction;
    if (action === 'accept') choose('yes');
    if (action === 'reject') choose('no');
    if (action === 'settings') show(true);
    if (action === 'save') choose(ui.querySelector('#cookie-analytics').checked ? 'yes' : 'no');
  });
  trigger.addEventListener('click', () => show(true));
  window.addEventListener('storage', event => { if (event.key === key) hide(); });
  window.ProkonceptConsent = { show, hide };
  if (!['yes', 'no'].includes(read()) && !document.body.hasAttribute('data-consent-info')) show();
})();
