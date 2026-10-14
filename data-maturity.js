/* Local self-assessment, not a validated benchmark or an AI-readiness test.
   Two questions per dimension, scored 0–2; unknown answers are excluded.
   Equal weights. Bands: mean < .75 / < 1.5 / >= 1.5.
   Recommendations prioritize unknown or weakest dimensions. */
(() => {
  const root = document.getElementById('datamodenhed');
  if (!root) return;
  const get = id => root.querySelector(`#${id}`);
  const dimensions = [
    { name: 'Systemer og sammenhæng', action: 'Kortlæg jeres vigtigste datakilder og vælg ét arbejdsflow, hvor data skal forbindes eller opdateres mere enkelt.' },
    { name: 'Kvalitet og struktur', action: 'Undersøg et konkret datasæt for mangler og dubletter. Aftal fælles definitioner og en rutine for at rette fejl.' },
    { name: 'Ansvar og organisering', action: 'Udpeg ansvarlige for de vigtigste data og aftal med ledelsen, hvordan kvalitet og anvendelse følges op.' },
    { name: 'Brug i hverdagen', action: 'Vælg én beslutning eller arbejdsgang, hvor data kan hjælpe. Gør resultatet forståeligt og følg op på effekten.' }
  ];
  const questions = [
    { dimension: 0, text: 'Kan I hente de data, I har brug for, fra jeres systemer?', options: ['Det er svært og kræver meget manuelt arbejde', 'Vi kan hente det meste, men det kræver tilpasning', 'Ja, gennem faste udtræk eller integrationer'] },
    { dimension: 0, text: 'Kan oplysninger fra forskellige systemer forbindes med hinanden?', options: ['De ligger adskilt og er svære at sammenholde', 'Vi sammenholder dem delvist i regneark', 'Ja, med fælles nøgler og faste arbejdsgange'] },
    { dimension: 1, text: 'Hvordan opdager og retter I fejl, mangler og dubletter i data?', options: ['Vi opdager dem typisk, når de giver problemer', 'Vi laver manuelle kontroller indimellem', 'Vi har faste kontroller og ansvar for at rette fejl'] },
    { dimension: 1, text: 'Er betydningen af jeres vigtigste felter og nøgletal fælles og dokumenteret?', options: ['Definitionerne varierer eller er ikke beskrevet', 'Nogle definitioner er aftalt eller dokumenteret', 'Ja, definitioner og enheder er dokumenteret og bruges fælles'] },
    { dimension: 2, text: 'Er det tydeligt, hvem der har ansvar for jeres data?', options: ['Nej, ansvaret er uklart', 'Nogle har ansvar, men det er ikke samlet aftalt', 'Ja, ansvar for kvalitet, adgang og opdatering er aftalt'] },
    { dimension: 2, text: 'Hvordan støtter ledelsen arbejdet med data?', options: ['Det er primært enkeltpersoners initiativ', 'Der er opbakning til enkelte projekter', 'Der er fælles mål, tid og løbende opfølgning'] },
    { dimension: 3, text: 'Hvordan bruges data i ledelsens og medarbejdernes beslutninger?', options: ['Mest ad hoc eller til historiske rapporter', 'Til nogle beslutninger, men ikke som en fast rutine', 'Løbende, med opdaterede analyser og opfølgning'] },
    { dimension: 3, text: 'Kan brugerne forstå resultaterne og følge op på dem?', options: ['Resultaterne er svære at forstå eller bliver sjældent brugt', 'Nogle kan bruge dem, ofte med hjælp fra en specialist', 'Resultater, begrænsninger og næste handling er tydelige for brugerne'] }
  ];
  let index = 0;
  let answers = Array(questions.length).fill(null);
  function render(focus = true) {
    const question = questions[index];
    get('dmStep').textContent = `Spørgsmål ${index + 1} af ${questions.length}`;
    get('dmCategory').textContent = dimensions[question.dimension].name;
    get('dmQuestion').textContent = question.text;
    get('dmOptions').replaceChildren();
    [...question.options, 'Ved ikke'].forEach((text, value) => {
      const label = document.createElement('label');
      label.className = 'quiz-opt maturity-option';
      const input = document.createElement('input');
      input.type = 'radio'; input.name = 'data-maturity-answer'; input.value = value;
      input.checked = answers[index] === value;
      const span = document.createElement('span'); span.textContent = text;
      input.addEventListener('change', () => {
        answers[index] = value;
        get('dmNext').disabled = false;
        updateProgress();
      });
      label.append(input, span); get('dmOptions').append(label);
    });
    get('dmBack').disabled = index === 0;
    get('dmNext').disabled = answers[index] === null;
    get('dmNext').textContent = index === questions.length - 1 ? 'Se vurdering →' : 'Næste →';
    updateProgress();
    if (focus) get('dmQuestion').focus({ preventScroll: true });
  }
  function updateProgress() {
    const answered = answers.filter(a => a !== null).length;
    get('dmProgress').setAttribute('aria-valuenow', answered);
    get('dmBar').style.width = `${answered / questions.length * 100}%`;
  }
  function start() {
    index = 0; answers = Array(questions.length).fill(null);
    get('dmWelcome').hidden = true; get('dmResult').hidden = true; get('dmWizard').hidden = false;
    render();
  }
  function results() {
    const known = answers.filter(a => a !== 3);
    const unknown = answers.length - known.length;
    const mean = known.length ? known.reduce((sum, value) => sum + value, 0) / known.length : null;
    const partial = unknown > 0;
    get('dmResultTitle').textContent = mean === null ? 'Afklar jeres udgangspunkt' : partial ? 'Et delvist billede af jeres datamodenhed' : mean < .75 ? 'Styrk datagrundlaget' : mean < 1.5 ? 'Byg videre på det, der virker' : 'Et systematisk udgangspunkt';
    get('dmResultText').textContent = mean === null
      ? 'I har svaret “Ved ikke” på alle spørgsmål. Første skridt er at få et fælles billede af datakilder, kvalitet og ansvar.'
      : partial
        ? `I har svaret “Ved ikke” på ${unknown} af otte spørgsmål. De kendte svar giver et foreløbigt billede; afklar de åbne spørgsmål, før I vælger den næste løsning.`
        : mean < .75
          ? 'Svarene peger på behov for mere struktur, klare roller og faste rutiner. Begynd med et afgrænset område, hvor forbedringer kan gøre en forskel.'
          : mean < 1.5
            ? 'I har flere byggesten på plads. Næste skridt er at skabe mere sammenhæng og gøre kvalitet, ansvar og anvendelse til faste rutiner.'
            : 'Svarene peger på systematisk arbejde med data. Undersøg konkrete forbedringsmuligheder og afprøv nye analyser på et afgrænset, kontrolleret grundlag.';
    get('dmDimensions').replaceChildren(); get('dmActions').replaceChildren();
    const areas = dimensions.map((dimension, d) => {
      const values = answers.filter((a, q) => questions[q].dimension === d);
      const available = values.filter(a => a !== 3);
      const score = available.length ? available.reduce((sum, value) => sum + value, 0) / available.length : null;
      const unclarified = values.includes(3);
      const term = document.createElement('dt'); term.textContent = dimension.name;
      const definition = document.createElement('dd');
      definition.textContent = unclarified ? 'Behov for afklaring' : score < .75 ? 'Behov for grundarbejde' : score < 1.5 ? 'Delvist på plads' : 'Systematisk i jeres svar';
      get('dmDimensions').append(term, definition);
      return { ...dimension, score, unclarified };
    });
    areas.sort((a, b) => Number(b.unclarified) - Number(a.unclarified) || (a.score ?? -1) - (b.score ?? -1)).slice(0, 3).forEach(area => {
      const item = document.createElement('li');
      item.textContent = `${area.unclarified ? 'Afklar med de relevante kolleger: ' : ''}${area.action}`;
      get('dmActions').append(item);
    });
    get('dmAiNote').textContent = 'Denne selvvurdering viser ikke, om jeres data er egnede til ML eller AI. Det kræver en konkret kontrol af kvalitet, relevans, repræsentativitet og anvendelse samt vurdering af modellens resultater.';
    get('dmWizard').hidden = true; get('dmResult').hidden = false;
    get('dmResultTitle').focus({ preventScroll: true });
  }
  get('dmStart').addEventListener('click', start);
  get('dmRestart').addEventListener('click', start);
  get('dmBack').addEventListener('click', () => { if (index > 0) { index--; render(); } });
  get('dmNext').addEventListener('click', () => {
    if (answers[index] === null) return;
    if (index === questions.length - 1) results(); else { index++; render(); }
  });
})();
