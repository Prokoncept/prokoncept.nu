/* Qualitative local needs check. No customer rating, financial estimate or storage. */
(() => {
  const item = (question, options, action) => ({ question, options, action });
  const datasets = {
    analysis: [
      item('Har I et samlet overblik over indkøbet på tværs af leverandører og projekter?', ['Ja, med opdaterede data', 'Delvist, med manuelle sammenstillinger', 'Nej, oplysningerne er spredte'], 'Saml køb fra de vigtigste leverandører i én aftalt periode, så I får et fælles analysegrundlag.'),
      item('Kan I følge prisudvikling, enheder og pakningsstørrelser på vareniveau?', ['Ja, vi følger det systematisk', 'Kun for udvalgte varer', 'Nej, det er svært at sammenligne'], 'Sammenlign enheder, pakningsstørrelser og prisudvikling for jeres mest købte varer.'),
      item('Bliver fakturaer kontrolleret mod aftalte priser, rabatter og bonus?', ['Ja, løbende og dokumenteret', 'Vi laver stikprøver', 'Nej, ikke som en fast rutine'], 'Undersøg et afgrænset udsnit af fakturaer mod gældende aftaler og bonusvilkår.'),
      item('Har I overblik over fragt, gebyrer, paller og mange småordrer?', ['Ja, vi følger omkostninger og adfærd', 'Vi kender noget af det', 'Nej, vi ser primært på vareprisen'], 'Kortlæg fragt, gebyrer, paller og bestillingsmønstre for at forstå de samlede indkøbsomkostninger.'),
      item('Følger I returneringer, kreditnotaer og fejl til sagen er afsluttet?', ['Ja, med ansvar og status', 'Det sker delvist', 'Nej, opfølgningen er usystematisk'], 'Saml åbne krediteringer og returneringer og aftal ansvar for at følge dem til afslutning.'),
      item('Bliver analyserne gennemgået og omsat til konkrete handlinger?', ['Ja, vi prioriterer og følger op', 'Indimellem, men uden fast opfølgning', 'Sjældent, eller vi mangler en analyse'], 'Vælg få konkrete fund og aftal næste handling, ansvar og tidspunkt for opfølgning.')
    ],
    negotiation: [
      item('Har I opdaterede aftaler for jeres vigtigste leverandører?', ['Ja, de er samlet og gennemgået', 'Nogle aftaler er opdaterede', 'Nej, overblikket eller aftalerne mangler'], 'Saml og gennemgå aftalerne med jeres vigtigste leverandører, herunder udløb og opsigelsesfrister.'),
      item('Bygger forhandlingerne på jeres faktiske køb og behov?', ['Ja, med dokumenterede data', 'Delvist, med et begrænset grundlag', 'Nej, mest på erfaring eller enkeltpriser'], 'Lav et købs- og behovsoverblik, som kan bruges som fælles udgangspunkt i forhandlingerne.'),
      item('Sammenligner I både pris, betingelser, kvalitet og levering?', ['Ja, efter fælles kriterier', 'Nogle forhold sammenlignes', 'Nej, fokus er mest på pris'], 'Aftal fælles kriterier for pris, vilkår, kvalitet, levering og samarbejde, før tilbud sammenlignes.'),
      item('Er det tydeligt, hvem der deltager, beslutter og følger op?', ['Ja, rollerne er aftalt', 'Delvist, men processen varierer', 'Nej, roller eller mandat er uklare'], 'Aftal roller og mandat i forhandlingen, så beslutninger og dialog er forankret hos jer.'),
      item('Kontrollerer I, om priser, rabatter og bonus følger aftalen?', ['Ja, med løbende kontrol', 'Kun ved større afvigelser', 'Nej, det følges ikke systematisk'], 'Planlæg kontrol af fakturering og bonus, så de forhandlede vilkår også bliver fulgt i praksis.'),
      item('Har I faste statusmøder og en plan for genforhandling?', ['Ja, med fælles opfølgning', 'Møderne holdes efter behov', 'Nej, eller først når noget går galt'], 'Aftal statusmøder og tidspunkter for genforhandling med de vigtigste leverandører.')
    ],
    operations: [
      item('Har ledelse og medarbejdere et fælles billede af de vigtigste forbedringsbehov?', ['Ja, med klare prioriteringer', 'Vi er enige om nogle områder', 'Nej, der er forskellige opfattelser'], 'Afklar én vigtig udfordring sammen med ledelse og medarbejdere, før løsningen vælges.'),
      item('Er mål og ansvar for forbedringer tydeligt aftalt?', ['Ja, med ejere og opfølgning', 'Målene findes, men ansvar eller opfølgning varierer', 'Nej, det er uklart'], 'Sæt et konkret mål og aftal ansvar, rammer og opfølgning for den valgte indsats.'),
      item('Kender I flaskehalse og gentagne manuelle opgaver i jeres arbejdsgange?', ['Ja, vi følger og prioriterer dem', 'Vi kender nogle, men har ikke et samlet billede', 'Nej, eller problemerne håndteres fra dag til dag'], 'Kortlæg en central arbejdsgang og undersøg ventetid, dobbeltarbejde og gentagne manuelle opgaver.'),
      item('Har I data, som I kan bruge til at vurdere omkostninger og effekt?', ['Ja, med fælles definitioner', 'Delvist, men data kræver bearbejdning', 'Nej, datagrundlaget er utilstrækkeligt'], 'Afklar, hvilke data der kan vise omkostninger og effekt, og kontrollér kvalitet og definitioner.'),
      item('Bliver medarbejderne inddraget, når rutiner eller systemer ændres?', ['Ja, fra afklaring til afprøvning', 'Nogle gange', 'Sjældent, eller først ved ibrugtagning'], 'Involvér de medarbejdere, der har opgaverne, og afprøv ændringen i lille skala.'),
      item('Følger I op på, om ændringer fungerer og skaber den ønskede effekt?', ['Ja, med faste målepunkter og justeringer', 'Vi følger op indimellem', 'Nej, det sker ikke som en fast rutine'], 'Aftal en enkel måde at følge effekten på og et tidspunkt, hvor løsningen justeres sammen med brugerne.')
    ]
  };
  document.querySelectorAll('[data-needs-check]').forEach(root => {
    const questions = datasets[root.dataset.needsCheck];
    if (!questions) return;
    const get = selector => root.querySelector(selector);
    let index = 0;
    let answers = Array(questions.length).fill(null);
    function progress() {
      const n = answers.filter(a => a !== null).length;
      get('[role=progressbar]').setAttribute('aria-valuenow', n);
      get('.quiz-bar-fill').style.width = `${n / questions.length * 100}%`;
    }
    function render() {
      get('[data-step]').textContent = `Spørgsmål ${index + 1} af ${questions.length}`;
      get('legend').textContent = questions[index].question;
      get('.quiz-opts').replaceChildren();
      [...questions[index].options, 'Ved ikke'].forEach((text, value) => {
        const label = document.createElement('label'); label.className = 'quiz-opt maturity-option';
        const input = document.createElement('input'); input.type = 'radio'; input.name = `needs-${root.dataset.needsCheck}`; input.value = value; input.checked = answers[index] === value;
        const span = document.createElement('span'); span.textContent = text;
        input.addEventListener('change', () => { answers[index] = value; get('[data-next]').disabled = false; progress(); });
        label.append(input,span); get('.quiz-opts').append(label);
      });
      get('[data-back]').disabled = index === 0;
      get('[data-next]').disabled = answers[index] === null;
      get('[data-next]').textContent = index === questions.length - 1 ? 'Se forslag →' : 'Næste →';
      progress(); get('legend').focus({ preventScroll: true });
    }
    function start() { index = 0; answers.fill(null); get('[data-welcome]').hidden = true; get('[data-result]').hidden = true; get('[data-wizard]').hidden = false; render(); }
    function result() {
      const unknown = answers.filter(a => a === 3).length;
      const issues = answers.filter(a => a === 2).length;
      const partial = answers.filter(a => a === 1).length;
      get('[data-result] h3').textContent = unknown === answers.length ? 'Skab et fælles overblik' : issues ? 'Et konkret sted at begynde' : partial ? 'Gør opfølgningen mere systematisk' : unknown ? 'Afklar de åbne spørgsmål' : 'Byg videre på det, der fungerer';
      get('[data-summary]').textContent = unknown === answers.length
        ? 'I har svaret “Ved ikke” på alle spørgsmål. Begynd med at afklare jeres udgangspunkt sammen med de relevante kolleger.'
        : issues || partial
          ? 'Svarene peger på områder, der kan være relevante at undersøge sammen. Forslagene nedenfor er et udgangspunkt for dialog — ikke en vurdering af besparelsens størrelse.'
          : 'De kendte svar peger på flere gode rutiner. En samtale kan hjælpe med at finde relevante detaljer og aftale, om der er behov for støtte.';
      if (unknown && unknown !== answers.length) get('[data-summary]').textContent += ` I har ${unknown} åbne spørgsmål, som bør afklares.`;
      const priorities = questions.map((q,i) => ({ ...q, value: answers[i] })).sort((a,b) => ({3:3,2:2,1:1,0:0}[b.value] - {3:3,2:2,1:1,0:0}[a.value])).slice(0,3);
      get('[data-actions]').replaceChildren();
      priorities.forEach(q => { const li = document.createElement('li'); li.textContent = `${q.value === 3 ? 'Afklar med de relevante kolleger: ' : q.value === 0 ? 'Som opfølgning kan I: ' : ''}${q.action}`; get('[data-actions]').append(li); });
      get('[data-wizard]').hidden = true; get('[data-result]').hidden = false; get('[data-result] h3').focus({ preventScroll: true });
    }
    get('[data-start]').addEventListener('click',start); get('[data-restart]').addEventListener('click',start);
    get('[data-back]').addEventListener('click',()=>{ if(index>0){index--;render();} });
    get('[data-next]').addEventListener('click',()=>{if(answers[index]===null)return; if(index<questions.length-1){index++;render();}else result();});
  });
})();
