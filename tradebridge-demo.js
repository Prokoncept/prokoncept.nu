const tradeBridgeDemoUrl = 'https://prokoncept.shinyapps.io/TradeBridge_demo/';
const demoTriggers = document.querySelectorAll('[data-tradebridge-demo], [data-dashboard-demo]');

if(demoTriggers.length){
  const modal = document.createElement('dialog');
  modal.className = 'tradebridge-demo-modal';
  modal.setAttribute('aria-labelledby', 'tradebridge-demo-title');
  modal.innerHTML = `
    <div class="tradebridge-demo-shell">
      <div class="tradebridge-demo-bar">
        <div class="tradebridge-demo-title" id="tradebridge-demo-title"><span aria-hidden="true">P</span>TradeBridge · interaktiv demo</div>
        <div class="tradebridge-demo-actions">
          <a class="tradebridge-demo-external" href="${tradeBridgeDemoUrl}" target="_blank" rel="noopener">Åbn i separat vindue</a>
          <button class="tradebridge-demo-close" type="button" aria-label="Luk TradeBridge-demoen">Luk <span aria-hidden="true">×</span></button>
        </div>
      </div>
      <iframe class="tradebridge-demo-frame" title="TradeBridge interaktiv demo" loading="lazy" allow="clipboard-write"></iframe>
    </div>`;
  document.body.appendChild(modal);

  const frame = modal.querySelector('iframe');
  const closeButton = modal.querySelector('.tradebridge-demo-close');
  let lastTrigger = null;

  function openDemo(trigger){
    lastTrigger = trigger;
    const dashboard = trigger.hasAttribute('data-dashboard-demo');
    const demoUrl = dashboard ? 'https://prokoncept.shinyapps.io/procurement_dashboard_demo/' : tradeBridgeDemoUrl;
    const demoName = dashboard ? 'Indkøbsanalyse' : 'TradeBridge';
    modal.querySelector('.tradebridge-demo-title').lastChild.textContent = `${demoName} · interaktiv demo`;
    modal.querySelector('.tradebridge-demo-external').href = demoUrl;
    closeButton.setAttribute('aria-label', `Luk ${demoName}-demoen`);
    frame.title = `${demoName} interaktiv demo`;
    frame.src = demoUrl;
    document.body.classList.add('has-demo-modal');
    modal.showModal();
    closeButton.focus();
  }

  function closeDemo(){
    modal.close();
  }

  demoTriggers.forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    openDemo(trigger);
  }));
  closeButton.addEventListener('click', closeDemo);
  modal.addEventListener('click', event => {
    if(event.target === modal) closeDemo();
  });
  modal.addEventListener('close', () => {
    frame.src = 'about:blank';
    document.body.classList.remove('has-demo-modal');
    lastTrigger?.focus();
  });
}
