(function(){
  "use strict";

  /* count-up numbers + progress bar, triggered once hero is visible */
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var isInt = target % 1 === 0;
    var start = null, dur = 1100;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min(1, (ts-start)/dur);
      var eased = 1 - Math.pow(1-p, 3);
      var val = target*eased;
      el.textContent = (isInt ? Math.round(val) : val.toFixed(1)).toString().replace('.', ',') + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var heroGraphic = document.getElementById('heroGraphic');
  var ogBarFill = document.getElementById('ogBarFill');
  var animated = false;
  if('IntersectionObserver' in window && heroGraphic){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && !animated){
          animated = true;
          heroGraphic.querySelectorAll('[data-count]').forEach(animateCount);
          if(ogBarFill) ogBarFill.style.width = '94.2%';
          io.disconnect();
        }
      });
    }, {threshold:.4});
    io.observe(heroGraphic);
  } else if(heroGraphic){
    heroGraphic.querySelectorAll('[data-count]').forEach(function(el){ el.textContent = el.getAttribute('data-count').replace('.',',') + (el.getAttribute('data-suffix')||''); });
    if(ogBarFill) ogBarFill.style.width = '94.2%';
  }

  /* ---- service pages (content from the one-page PDFs, shown inside the site) ---- */
  var SLOGANS = ["Få bedre overblik","Frigør tid i hverdagen","Træf bedre beslutninger","Styrk bundlinjen"];
  var SERVICES = [
    {num:"01", title:"Indkøbsindsigt", sub:"Få overblik over det samlede indkøb",
     intro:"Prokoncept samler og strukturerer fakturadata for at give et klart billede af køb, priser, varegrupper og leverandører. Dette dokumenterede grundlag muliggør bedre prioriteringer og stærkere forhandlinger.",
     quote:"Se også de produkter, der købes uden en aftalt pris – og skab nyt forhandlingspotentiale.",
     steps:[["Fakturadata","Fakturaer og varelinjer"],["Samlet indsigt","Køb pr. leverandør og varegruppe"],["Analyse","Aftalt og ikke-aftalt køb"],["Handling","Prioritér potentialet"]],
     pairs:{a:"Indkøbsbilledet viser", b:"Det betyder for virksomheden", rows:[["Køb pr. leverandør og konto","Nyt forhandlingspotentiale"],["Varegrupper og varer","Mindre manuelt analysearbejde"],["Produkter uden aftalt pris","Bedre prioritering af indsatsen"]]},
     benefits:["Overblik","Aftaledækning","Prioritering"],
     close:"Styrk bundlinjen. Få et klart beslutningsgrundlag for jeres indkøb."},
    {num:"02", title:"Aftaler & forhandling", sub:"Skab bedre aftaler med et stærkt datagrundlag",
     intro:"Prokoncept forbereder og gennemfører leverandørforhandlinger baseret på faktiske køb, behov og markedsmuligheder. Produkter købt uden aftalt pris fremhæves, så potentialet kan omsættes til nye vilkår og bedre aftaledækning.",
     quote:"Bedre aftaler begynder med bedre data – også om det køb, der i dag ligger uden for aftalen.",
     steps:[["Købsdata","Volumen, varer og ikke-aftalt køb"],["Forhandling","Priser, rabatter og nye muligheder"],["Aftale","Tydelige betingelser og mål"],["Implementering","Aftalen bruges og følges op"]],
     lists:[["Resultater for virksomheden",["Konsolidering af volumen","Produkter uden aftalt pris","Klar forhandlingsposition","Nye priser og bedre aftaledækning","Styrket leverandørsamarbejde"]]],
     benefits:["Datagrundlag","Potentiale","Aftaleværdi","Forankring"],
     close:"Skab bedre aftaler med et stærkt datagrundlag."},
    {num:"03", title:"Aftale- & fakturakontrol", sub:"Får I det, I har forhandlet?",
     intro:"Vi kontrollerer løbende fakturaer mod aftaler, prisfiler og betingelser. Det gør prisfejl, manglende rabatter, uventede gebyrer og køb uden aftalt pris synlige, mens der stadig kan handles.",
     quote:"Vi finder både fejl i aftalte køb og produkter, der købes uden en aftalt pris.",
     steps:[["Aftaler","Prisfiler, rabatter og vilkår"],["Kontrol","Faktura mod aftale"],["Afvigelser","Fejl og ikke-aftalt køb"],["Opfølgning","Ret fejl og udvid aftaledækning"]],
     pairs:{a:"Vi kontrollerer blandt andet", b:"Det betyder for virksomheden", rows:[["Fakturerede priser og rabatter","Tidlig opdagelse af prisfejl"],["Bonus, gebyrer og tillæg","Grundlag for kreditering"],["Produkter uden aftalt pris","Nyt grundlag for forhandling"]]},
     benefits:["Kontrol","Aftaledækning","Kreditering","Resultat"],
     close:"Kontrollér aftaler og priser, mens der stadig kan handles."},
    {num:"04", title:"Projektkontrol", sub:"Få løbende overblik over projektets indkøb af materialer",
     intro:"Vi indsamler fakturadata hos leverandørerne og indlæser projektpriser, aftaler og projektbudget i ét overblik. Vi kontrollerer og genererer en rapport, så projektlederen kan reagere på afvigelser, straks de fremkommer.",
     quote:"Se også materialer, der er købt uden en projektpris eller aftalt pris.",
     steps:[["Datagrundlag","Fakturadata, projektpriser og budget"],["Samlet kontrol","Forbrug, priser, rabat og gebyrer"],["Løbende rapportering","Afvigelser og køb uden projektpris"],["Projektleder","Prioritér indsatsen og beskyt resultatet"]],
     lists:[["Den løbende rapportering viser",["Materialekøb mod budget","Produkter uden projektpris eller aftale","Pris- og aftaleafvigelser","Tidlig varsling ved afvigelser","Nyt grundlag for projektpriser"]],["Det betyder for projektlederen",["Bedre styring af projektøkonomien"]]],
     benefits:["Tidlig varsling","Aftaledækning","Bedre styring","Stærkere resultat"],
     close:"Få et enkelt og aktuelt styringsgrundlag for hver sag."},
    {num:"05", title:"Afvigelser & krediteringer", sub:"Opdag afvigelser, før de bliver dyre",
     intro:"Vi sammenholder fakturaer, aftaler, projektpriser og budgetter for at identificere de forhold, der bør undersøges. I får en overskuelig og dokumenteret liste over fejl, afvigelser, køb uden aftalt pris og mulige krediteringer.",
     quote:"Køb uden pris eller aftale kan være jeres næste konkrete forhandlingspotentiale.",
     steps:[["Data","Fakturaer, aftaler og priser"],["Sammenligning","Pris, rabat, enhed og mængde"],["Afvigelser","Fejl og ikke-aftalt køb"],["Handling","Kreditering eller ny aftale"]],
     lists:[["Vi finder eksempelvis",["Forkert faktureret pris","Manglende rabat eller bonus","Produkter uden aftalt pris eller projektpris"]],["Det betyder for virksomheden",["Fejl bliver synlige i tide","Nyt potentiale for forhandling","Grundlag for at få pengene tilbage"]]],
     benefits:["Synlighed","Aftaledækning","Kreditering","Besparelse"],
     close:"Find afvigelserne og styrk jeres aftaledækning."},
    {num:"06", title:"AI, automatisering & data", sub:"Gode analyser begynder med et godt datagrundlag",
     intro:"Vi kombinerer dataanalyse med forståelse for systemer, databaser og software. Før vi importerer og analyserer jeres data, vurderer vi datamodenheden: kvalitet og struktur, systemernes sammenhæng samt ansvar og anvendelse i hverdagen.",
     quote:"Et forståeligt resultat kræver både et godt datagrundlag og en faglig vurdering.",
     steps:[["Datamodenhed","Afklar kilder, kvalitet, ansvar og brug"],["Datagrundlag","Strukturér og kontrollér relevante data"],["Analyse","Find mønstre og forbedringsmuligheder"],["Handling","Forklar resultater og følg op på effekten"]],
     lists:[["Vi undersøger",["Systemer, databaser og muligheder for integration","Mangler, dubletter og fælles definitioner","Roller, ledelsens opbakning og brugernes rutiner"]],["Det kan føre til",["Mere pålidelig rapportering og datakontrol","Tilpassede analyser og automatisering","ML og AI, når opgaven og datagrundlaget egner sig til det"]]],
     benefits:["Datamodenhed","Datakvalitet","Forståelige resultater","Opfølgning"],
     close:"Lad os undersøge, hvordan jeres data kan skabe værdi."},
    {num:"07", title:"Plastdata & indberetning", sub:"Gør plastdata klar til indberetning",
     intro:"Vi indhenter og samler data om importeret plast fra relevante datakilder. Resultatet er et dokumenteret overblik og en rapport, der gør indberetningsarbejdet mere enkelt og sikkert.",
     quote:"Fra spredte data til et dokumenteret grundlag for indberetning.",
     steps:[["Datakilder","Leverandører og varedata"],["Indsamling","Saml importeret plast"],["Kontrol","Tjek grundlag og mangler"],["Rapport","Klar til indberetning"]],
     lists:[["Løsningen samler",["Data fra leverandører og egne systemer","Varelinjer og relevante materialer","Dokumentation for indberetningsgrundlag"]],["Det betyder for virksomheden",["Mindre manuelt indberetningsarbejde","Bedre dokumentation og sporbarhed","Et grundlag, der er klar til brug"]]],
     benefits:["Datagrundlag","Dokumentation","Rapportering","Tidsbesparelse"],
     close:"Få styr på plastdata og indberetning."},
    {num:"08", title:"Aftaleoverblik i indkøbsdashboardet", sub:"Styr på aftaler og prisvarslinger",
     intro:"Som en del af indkøbsdashboardet samler vi leverandør- og samhandelsaftaler, priser, rabatter og varslede prisstigninger. Det giver et opdateret overblik og gør det lettere at følge op, før ændringer rammer resultatet.",
     quote:"Aftaler og prisvarslinger samlet i ét overblik – klar til opfølgning.",
     steps:[["Aftaler","Indlæs aftaler og vilkår"],["Priser","Priser, rabatter og bonus"],["Varslinger","Fang ændringer i tide"],["Opfølgning","Prioritér næste handling"]],
     lists:[["Dashboardet giver overblik over",["Leverandøraftaler og samhandelsvilkår","Aftalepriser, rabatter og bonus","Varslede prisstigninger og frister"]],["Det betyder for virksomheden",["Færre aftaler i skuffen","Bedre opfølgning før varslinger træder i kraft","Stærkere grundlag for dialog med leverandører"]]],
     benefits:["Overblik","Varsling","Opfølgning","Aftaleværdi"],
     close:"Saml aftaler og prisudvikling i ét dashboard."},
    {num:"09", title:"TradeBridge platform", sub:"Jeres indkøb – én fælles sandhed",
     intro:"TradeBridge samler indkøbsdata fra leverandørerne med jeres egne aftaler og priser. I får løbende adgang til data på linjeniveau, et klart aftalegrundlag og fakturakontrol som en fast del af styringen.",
     quote:"Data, aftaler og fakturakontrol samlet i én platform.",
     steps:[["Leverandørdata","Indlæs fakturaer og varelinjer"],["Aftaler & priser","Saml aftalegrundlaget"],["Fakturakontrol","Find fejl og ikke-aftalt køb"],["Handling","Følg op og dokumentér effekt"]],
     lists:[["TradeBridge samler",["Køb på faktura- og varelinjeniveau","Aftaler, priser, rabatter og betingelser","Afvigelser og køb uden aftalt pris"]],["Det betyder for virksomheden",["Én fælles og opdateret datakilde","Løbende fakturakontrol og bedre aftaledækning","Stærkere samarbejde med leverandører"]]],
     benefits:["Fælles data","Kontrol","Aftaledækning","Handling"],
     close:"Gør indkøbsdata til en del af den daglige styring."}
  ];

  var modal = document.getElementById('svcModal');
  var modalPanel = document.getElementById('svcPanel');
  var curSvc = 0, lastFocus = null;
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  function renderService(i){
    var s = SERVICES[i];
    var html = '';
    html += '<div class="m-head"><div class="m-count">'+(i+1)+' / '+SERVICES.length+'</div>'
          + '<div class="m-nav"><button type="button" class="icon-btn" id="mPrev" aria-label="Forrige ydelse">←</button>'
          + '<button type="button" class="icon-btn" id="mNext" aria-label="Næste ydelse">→</button>'
          + '<button type="button" class="icon-btn" id="mClose" aria-label="Luk">✕</button></div></div>';
    html += '<div class="m-hero"><div class="eyebrow">Ydelse '+esc(s.num)+'</div><h2 id="svcTitle">'+esc(s.title)+'</h2><div class="sub">'+esc(s.sub)+'</div><p>'+esc(s.intro)+'</p></div>';
    html += '<div class="m-quote">“'+esc(s.quote)+'”</div>';
    html += '<div class="m-body"><div class="m-label">Fra data til handling – straks</div><div class="m-steps">';
    s.steps.forEach(function(st, k){ html += '<div class="m-step"><div class="n">'+(k+1)+'</div><b>'+esc(st[0])+'</b><span>'+esc(st[1])+'</span></div>'; });
    html += '</div>';
    if(s.pairs){
      html += '<div class="m-pairs"><div class="ph"><div>'+esc(s.pairs.a)+'</div><div>'+esc(s.pairs.b)+'</div></div>';
      s.pairs.rows.forEach(function(r){ html += '<div class="pr"><div>'+esc(r[0])+'</div><div>'+esc(r[1])+'</div></div>'; });
      html += '</div>';
    }
    if(s.lists){
      var cls = ['mint','blue'];
      html += '<div class="m-cols" style="'+(s.lists.length===1?'grid-template-columns:1fr;':'')+'">';
      s.lists.forEach(function(l, k){
        html += '<div class="m-card '+cls[k%2]+'"><h4>'+esc(l[0])+'</h4><ul>';
        l[1].forEach(function(it){ html += '<li>'+esc(it)+'</li>'; });
        html += '</ul></div>';
      });
      html += '</div>';
    }
    html += '<div class="m-benefits'+(s.benefits.length===3?' three':'')+'">';
    s.benefits.forEach(function(b, k){ html += '<div class="m-benefit"><b>'+esc(b)+'</b><span>'+esc(SLOGANS[k])+'</span></div>'; });
    html += '</div></div>';
    html += '<div class="m-foot"><div><div class="t">'+esc(s.close)+'</div><div class="s">Kontakt Prokoncept for en kort gennemgang af mulighederne.</div></div>'
          + '<button type="button" class="btn btn-dark-solid" id="mContact">Kontakt os om '+esc(s.title.toLowerCase())+' →</button></div>';
    modalPanel.innerHTML = html;
    modal.scrollTop = 0;
    document.getElementById('mPrev').addEventListener('click', function(){ openService((curSvc-1+SERVICES.length)%SERVICES.length); });
    document.getElementById('mNext').addEventListener('click', function(){ openService((curSvc+1)%SERVICES.length); });
    document.getElementById('mClose').addEventListener('click', closeService);
    document.getElementById('mContact').addEventListener('click', function(){
      var title = SERVICES[curSvc].title;
      closeService();
      var sel = document.getElementById('fSubject');
      if(sel){ for(var o=0;o<sel.options.length;o++){ if(sel.options[o].value === title){ sel.value = title; } } }
      document.getElementById('kontakt').scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
  function openService(i){
    if(!modal.classList.contains('open')){ lastFocus = document.activeElement; }
    curSvc = i;
    renderService(i);
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    var c = document.getElementById('mClose'); if(c) c.focus();
  }
  function closeService(){
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    if(lastFocus && lastFocus.focus){ lastFocus.focus(); }
  }
  document.querySelectorAll('[data-service]').forEach(function(card){
    card.addEventListener('click', function(){ openService(parseInt(card.getAttribute('data-service'),10)-1); });
  });
  modal.addEventListener('click', function(ev){ if(ev.target === modal) closeService(); });
  document.addEventListener('keydown', function(ev){
    if(!modal.classList.contains('open')) return;
    if(ev.key === 'Escape'){ closeService(); }
    else if(ev.key === 'ArrowRight'){ openService((curSvc+1)%SERVICES.length); }
    else if(ev.key === 'ArrowLeft'){ openService((curSvc-1+SERVICES.length)%SERVICES.length); }
    else if(ev.key === 'Tab'){
      var f = modalPanel.querySelectorAll('button');
      if(!f.length) return;
      var first = f[0], last = f[f.length-1];
      if(ev.shiftKey && document.activeElement === first){ ev.preventDefault(); last.focus(); }
      else if(!ev.shiftKey && document.activeElement === last){ ev.preventDefault(); first.focus(); }
    }
  });

  /* ---- contact form ---- */
  var MAX_WORDS = 100;
  /* Sæt FORM_ENDPOINT til adressen på en formular-tjeneste (fx Formspree) eller Prokoncepts eget endpoint,
     så sendes beskeden som e-mail. Er den tom, virker formularen kun som forhåndsvisning. */
  var FORM_ENDPOINT = "";
  function sendToEndpoint(entry){
    return fetch(FORM_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(entry)})
      .then(function(res){ if(!res.ok) throw new Error('http'); });
  }
  var form = document.getElementById('contactForm');
  var fEmail = document.getElementById('fEmail');
  var fPhone = document.getElementById('fPhone');
  var fSubject = document.getElementById('fSubject');
  var fMessage = document.getElementById('fMessage');
  var fCount = document.getElementById('fCount');
  var fStatus = document.getElementById('fStatus');
  var fSend = document.getElementById('fSend');

  function wordCount(t){ var m = t.trim().match(/\S+/g); return m ? m.length : 0; }
  function updateCount(){
    var n = wordCount(fMessage.value);
    fCount.textContent = n + ' / ' + MAX_WORDS + ' ord';
    fCount.classList.toggle('over', n > MAX_WORDS);
  }
  fMessage.addEventListener('input', updateCount);
  updateCount();

  function setErr(field, msg){
    var wrap = field.closest('.field');
    wrap.classList.toggle('invalid', !!msg);
    wrap.querySelector('.ferr').textContent = msg || '';
  }
  function validate(){
    var ok = true;
    var em = fEmail.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){ setErr(fEmail, 'Skriv en gyldig e-mailadresse.'); ok = false; } else setErr(fEmail, '');
    var ph = fPhone.value.trim();
    if(ph && !/^[+0-9 ()-]{6,20}$/.test(ph)){ setErr(fPhone, 'Telefonnummeret ser forkert ud.'); ok = false; } else setErr(fPhone, '');
    if(!fSubject.value){ setErr(fSubject, 'Vælg et emne.'); ok = false; } else setErr(fSubject, '');
    var n = wordCount(fMessage.value);
    if(n === 0){ setErr(fMessage, 'Skriv en besked.'); ok = false; }
    else if(n > MAX_WORDS){ setErr(fMessage, 'Beskeden er ' + (n-MAX_WORDS) + ' ord for lang. Maks. ' + MAX_WORDS + ' ord.'); ok = false; }
    else setErr(fMessage, '');
    return ok;
  }
  function showStatus(kind, text){
    fStatus.className = 'fstatus ' + kind;
    fStatus.textContent = text;
  }

  var dbPromise = (window.claude && window.claude.use) ? window.claude.use('db') : Promise.resolve(null);
  var userPromise = (window.claude && window.claude.use) ? window.claude.use('user') : Promise.resolve(null);

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    fStatus.className = 'fstatus';
    if(!validate()) return;
    fSend.disabled = true; fSend.textContent = 'Sender …';
    var entry = {
      email: fEmail.value.trim(), phone: fPhone.value.trim(), subject: fSubject.value,
      message: fMessage.value.trim(), words: wordCount(fMessage.value), at: new Date().toISOString()
    };
    (FORM_ENDPOINT ? sendToEndpoint(entry) : Promise.all([dbPromise, userPromise]).then(function(r){
      var db = r[0], user = r[1];
      if(!db || !user) throw new Error('nostore');
      return user.id().then(function(uid){
        if(!uid) throw new Error('noid');
        var ref = db.doc('inquiries/' + uid);
        return ref.get().then(function(snap){
          var items = (snap.exists && snap.data() && snap.data().items) || [];
          items = items.concat([entry]).slice(-50);
          return ref.set({items: items});
        });
      });
    })).then(function(){
      showStatus('ok', FORM_ENDPOINT ? 'Tak for din besked.' : 'Tak for din besked. Forhåndsvisning: den er gemt i demoens indbakke og er endnu ikke sendt som e-mail til Prokoncept.');
      form.reset(); updateCount();
    }).catch(function(){
      showStatus('bad', 'Beskeden kunne ikke sendes fra denne forhåndsvisning. Skriv i stedet til info@prokoncept.nu.');
    }).then(function(){
      fSend.disabled = false; fSend.textContent = 'Send besked →';
    });
  });

  /* inbox for editors/owner of the artifact (demo only) */
  Promise.all([dbPromise, userPromise]).then(function(r){
    var db = r[0], user = r[1];
    if(!db || !user || !user.canEdit || !user.canEdit()) return;
    var box = document.getElementById('inbox');
    var list = document.getElementById('inboxList');
    box.classList.add('show');
    db.collection('inquiries').onSnapshot(function(snap){
      var all = [];
      snap.docs.forEach(function(d){ var items = (d.data() || {}).items || []; items.forEach(function(it){ all.push(it); }); });
      all.sort(function(a,b){ return a.at < b.at ? 1 : -1; });
      list.textContent = '';
      if(!all.length){ var e = document.createElement('div'); e.className = 'item'; e.textContent = 'Ingen henvendelser endnu.'; list.appendChild(e); return; }
      all.forEach(function(it){
        var d = document.createElement('div'); d.className = 'item';
        var top = document.createElement('div'); top.className = 'top';
        var a = document.createElement('span'); a.textContent = it.subject + ' · ' + it.email + (it.phone ? ' · ' + it.phone : '');
        var w = document.createElement('span'); w.className = 'when'; w.textContent = new Date(it.at).toLocaleString('da-DK');
        top.appendChild(a); top.appendChild(w);
        var p = document.createElement('p'); p.textContent = it.message;
        d.appendChild(top); d.appendChild(p); list.appendChild(d);
      });
    }, function(){});
  });

})();