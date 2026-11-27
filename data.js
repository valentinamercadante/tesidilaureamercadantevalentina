// Lezione illustrata – Parco Archeologico di Tindari (scuola primaria, 6-10 anni)
// Date e dettagli storici scritti da conoscenze generali: da verificare con la guida del parco / il Museo.
// Coordinate in percentuale (x,y) rispetto all'immagine. Per spostare un punto basta cambiare i numeri.
const MAP = { src: "img/mappa.jpg", w: 1300, h: 800 };

const SPOTS = [
  {
    id: "santuario", name: "Il Santuario", era: "Fede e pellegrinaggi", pin: [65, 76],
    images: [{ src: "img/santuario.jpg", w: 864, h: 1235 }],
    hs: [
      { k: "story", img: 0, x: 63.5, y: 36, label: "La cupola dorata" },
      { k: "word", img: 0, x: 58, y: 80, label: "Il sentiero" },
      { k: "facts", img: 0, x: 70, y: 54, label: "Il cannocchiale" },
    ],
    story: [
      "In cima alla rupe, a picco sul mare, sorge il Santuario di Tindari. Si riconosce da lontano per la sua cupola dorata.",
      "Dentro si conserva una statua molto antica con il volto scuro: la Madonna Nera. Ogni anno, soprattutto a settembre, arrivano pellegrini da tutta la Sicilia.",
    ],
    word: ["Pellegrino", "Chi compie un lungo viaggio per raggiungere un luogo sacro. Il sentiero di pietra porta fino al santuario."],
    facts: [
      "Dalla terrazza si vedono i laghetti di Marinello e, nelle giornate limpide, le isole Eolie.",
      "Il cannocchiale sul belvedere serve proprio a guardare lontano: provate a cercare il mare e la sabbia!",
    ],
    quiz: { q: "Come si chiama la statua dal volto scuro custodita nel santuario?",
            options: ["Madonna Nera", "Madonna Bianca", "Madonna Rossa"], answer: 0 },
  },
  {
    id: "teatro", name: "Il Teatro Greco", era: "IV-III secolo a.C.", pin: [39.2, 44.4],
    images: [
      { src: "img/teatro-1.jpg", w: 1365, h: 768, cap: "Il teatro visto dalla cavea" },
      { src: "img/teatro-2.jpg", w: 1195, h: 896, cap: "Il teatro visto dall'alto, con il mare" },
    ],
    hs: [
      { k: "story", img: 0, x: 52, y: 72, label: "Il palco" },
      { k: "word", img: 0, x: 13, y: 40, label: "I gradini" },
      { k: "facts", img: 1, x: 62, y: 26, label: "Il mare" },
    ],
    story: [
      "Il teatro fu costruito dai Greci sfruttando la pendenza della collina. Il pubblico si sedeva sui gradini e guardava gli attori recitare commedie e tragedie.",
      "Più tardi i Romani lo modificarono per ospitare anche altri spettacoli, come i combattimenti dei gladiatori. Ancora oggi in estate qui si fanno spettacoli!",
    ],
    word: ["Cavea", "La parte del teatro con i gradini dove si siede il pubblico."],
    facts: [
      "Davanti al teatro c'è il mare: gli spettatori avevano uno sfondo bellissimo dietro gli attori.",
      "I teatri antichi erano costruiti in modo che anche chi stava in alto sentisse bene le voci.",
    ],
    quiz: { q: "Come si chiama la parte del teatro dove si siede il pubblico?",
            options: ["Sipario", "Cavea", "Platea di velluto"], answer: 1 },
  },
  {
    id: "domus", name: "Le Case Romane (Isolato IV)", era: "Età romana", pin: [50.4, 48],
    images: [{ src: "img/case.jpg", w: 1365, h: 768 }],
    hs: [
      { k: "story", img: 0, x: 78, y: 33, label: "L'arco" },
      { k: "word", img: 0, x: 42, y: 50, label: "La scala" },
      { k: "facts", img: 0, x: 28, y: 32, label: "Le case di oggi" },
    ],
    story: [
      "In questa zona sono state scoperte le domus, le case dei Romani benestanti, costruite con grandi blocchi di pietra ben squadrati.",
      "Un gruppo di case unite si chiamava insula, che in latino significa 'isola': un isolato circondato dalle strade. Qui lo chiamiamo Isolato IV.",
    ],
    word: ["Domus", "La casa di una famiglia romana benestante, con stanze intorno a un cortile."],
    facts: [
      "Dietro gli scavi si vedono le case del paese di oggi: la città moderna vive accanto a quella antica!",
      "In alcune stanze i pavimenti erano decorati con mosaici, fatti di tanti piccoli pezzi di pietra colorata.",
    ],
    quiz: { q: "Con che cosa si realizza un mosaico?",
            options: ["Con tanti piccoli pezzi di pietra colorata", "Con pennarelli", "Con fogli di carta"], answer: 0 },
  },
  {
    id: "basilica", name: "La Basilica", era: "Età romana", pin: [57.3, 62.5],
    images: [{ src: "img/basilica.jpg", w: 880, h: 1188 }],
    hs: [
      { k: "story", img: 0, x: 55, y: 62, label: "Gli archi" },
      { k: "word", img: 0, x: 41, y: 22, label: "La torre" },
      { k: "facts", img: 0, x: 60, y: 33, label: "La cupola" },
    ],
    story: [
      "Quando arrivarono i Romani, Tindari si arricchì di grandi edifici pubblici. La Basilica era un luogo coperto e monumentale, dove le persone si incontravano e facevano affari.",
      "Oggi ne restano enormi archi di pietra: passandoci sotto si capisce quanto era grande!",
    ],
    word: ["Basilica", "Nell'antica Roma, grande edificio pubblico dove ci si incontrava. Non voleva dire 'chiesa'."],
    facts: [
      "Dietro gli archi si vede la cupola dorata del Santuario: due epoche diverse, una accanto all'altra.",
      "Molti archi romani stanno in piedi da duemila anni: i Romani erano maestri nel costruirli.",
    ],
    quiz: { q: "Quale popolo costruì la Basilica di Tindari?",
            options: ["Gli Egizi", "I Romani", "I Vichinghi"], answer: 1 },
  },
  {
    id: "antiquarium", name: "Il Museo", era: "Oggi", pin: [43.7, 52],
    images: [
      { src: "img/museo-1.jpg", w: 1365, h: 768, cap: "La sala delle vetrine" },
      { src: "img/museo-2.jpg", w: 874, h: 1216, cap: "Le vetrine con i vasi" },
    ],
    hs: [
      { k: "story", img: 0, x: 18, y: 55, label: "Le vetrine" },
      { k: "word", img: 0, x: 47, y: 72, label: "Le anfore" },
      { k: "facts", img: 1, x: 87, y: 40, label: "Il pannello" },
    ],
    story: [
      "Nel museo (chiamato Antiquarium) sono conservati i reperti trovati durante gli scavi: vasi, anfore, monete, statue e oggetti della vita di tutti i giorni.",
      "Gli archeologi li studiano come detective: ogni oggetto racconta come vivevano le persone tanto tempo fa.",
    ],
    word: ["Reperto", "Un oggetto antico trovato durante uno scavo archeologico."],
    facts: [
      "I pannelli sulle pareti spiegano dove e come sono stati trovati gli oggetti, con mappe e disegni.",
      "Prima di essere esposti, i reperti vengono puliti e restaurati con grande cura.",
    ],
    quiz: { q: "Chi studia gli oggetti antichi trovati sotto terra?",
            options: ["L'archeologo", "Il pasticcere", "Il pilota"], answer: 0 },
  },
  {
    id: "laghi", name: "Il Lago Verde e i laghetti", era: "Natura", pin: [78.5, 41],
    images: [{ src: "img/laghi.jpg", w: 338, h: 440 }],
    hs: [
      { k: "story", img: 0, x: 32, y: 58, label: "Il lago" },
      { k: "word", img: 0, x: 58, y: 42, label: "La sabbia" },
      { k: "facts", img: 0, x: 78, y: 20, label: "Il mare" },
    ],
    story: [
      "Ai piedi della rupe, tra la collina e il mare, c'è una riserva naturale: i laghetti di Marinello. Uno di loro si chiama Lago Verde.",
      "Sono piccole lagune separate dal mare da una striscia di sabbia. Qui vivono e si riposano uccelli, pesci e piante speciali.",
    ],
    word: ["Laguna", "Specchio d'acqua separato dal mare da una striscia di terra."],
    facts: [
      "Vento e onde cambiano continuamente la forma delle dune di sabbia.",
      "Alcuni uccelli migratori si fermano qui durante i loro lunghi viaggi.",
    ],
    quiz: { q: "Che cosa separa i laghetti dal mare?",
            options: ["Un muro di pietra", "Una striscia di sabbia", "Un ponte"], answer: 1 },
  },
  // Tappa pronta ma disattivata: manca un'immagine. Metti img/mura.jpg, imposta enabled:true e
  // scegli la posizione del pin sulla mappa (pin) e dei punti (hs).
  {
    id: "mura", enabled: false, name: "Le Mura Greche", era: "IV secolo a.C.", pin: [30, 15],
    images: [{ src: "img/mura.jpg", w: 1365, h: 768 }],
    hs: [
      { k: "story", img: 0, x: 50, y: 50, label: "Il muro" },
      { k: "word", img: 0, x: 30, y: 60, label: "I blocchi" },
      { k: "facts", img: 0, x: 70, y: 40, label: "La torre" },
    ],
    story: [
      "Nel 396 a.C. Dionisio I, tiranno di Siracusa, fondò qui una nuova città greca: Tindari. Il nome ricorda Tindaro, mitico re di Sparta.",
      "Per difendersi dai nemici i Greci costruirono mura fortissime, fatte di grandi blocchi di pietra squadrati e ben incastrati.",
    ],
    word: ["Colonia", "Una città nuova fondata da persone che arrivano da un'altra città."],
    facts: ["Le mura circondavano la città seguendo il bordo della collina.", "I blocchi sono tagliati in forme regolari, come enormi mattoni di pietra."],
    quiz: { q: "Perché i Greci costruirono le mura attorno a Tindari?",
            options: ["Per giocare a nascondino", "Per difendere la città", "Per fare ombra d'estate"], answer: 1 },
  },
].filter((s) => s.enabled !== false);

const TIMELINE = [
  ["Mito", "Il nome Tindari ricorda Tindaro, mitico re di Sparta."],
  ["396 a.C.", "Dionisio I di Siracusa fonda la città greca di Tindari."],
  ["IV-III sec. a.C.", "Si costruiscono le mura e il teatro."],
  ["III sec. a.C.", "Tindari diventa alleata dei Romani."],
  ["Età romana", "La città cresce: basilica, case, strade."],
  ["Tarda antichità", "Terremoti e frane danneggiano la città."],
  ["Medioevo", "La città si spopola e viene abbandonata."],
  ["Oggi", "Parco archeologico, museo e santuario: un luogo da scoprire."],
];

const INTRO = "Benvenuti a Tindari! Toccate i segnaposto sulla mappa per visitare le tappe. In ogni immagine cercate i punti da scoprire, poi rispondete al quiz per ottenere il timbro.";

// Crediti mostrati nel piè di pagina (tooltip "Informazioni").
// Il logo va salvato come img/logo-kore.svg (se manca, appare il nome dell'università).
const CREDITS = {
  autore: "Valentina Mercadante",
  annoLaurea: "2026/2027",   // anno accademico; se vuoto, non viene mostrato
  ateneo: "Università degli Studi di Enna «Kore»",
  disclaimer: "Materiale didattico a scopo illustrativo. Le immagini sono rielaborazioni a fumetto e i testi sono semplificati per i bambini: non sostituiscono la visita né le fonti ufficiali del Parco Archeologico di Tindari.",
};

// Frasi della guida (fumetto + lettura vocale)
const GUIDA = {
  home: "Ciao! Sono Valentina. Toccate un segnaposto sulla mappa per iniziare!",
  stop: "Cercate i punti «?» nell'immagine, poi fate il quiz!",
};

// Versione degli audio: aumentarla ogni volta che si rigenerano i file in audio/,
// così i browser non riutilizzano le vecchie copie salvate in cache.
const AUDIO_V = 3;

// ---------------------------------------------------------------------------
// LIVELLI DI CLASSE
// I testi base in SPOTS sono il livello "b" (3ª). Qui sotto le varianti:
//   a = 1ª-2ª: frasi brevissime, parole semplici
//   c = 4ª-5ª: testi più ricchi, lessico e dettagli in più
// Ogni classe ha anche la sua dimensione del carattere (fs); la 1ª usa lo stampatello maiuscolo.
// ---------------------------------------------------------------------------
const LIVELLI = [
  { n: 1, label: "1ª", tier: "a", fs: 1.3, caps: true },
  { n: 2, label: "2ª", tier: "a", fs: 1.2, caps: false },
  { n: 3, label: "3ª", tier: "b", fs: 1.1, caps: false },
  { n: 4, label: "4ª", tier: "c", fs: 1.0, caps: false },
  { n: 5, label: "5ª", tier: "c", fs: 1.0, caps: false },
];

const VARIANTI = {
  santuario: {
    a: { q: "Come si chiama la statua con il viso scuro?",
      story: ["Sulla collina c'è una grande chiesa.", "Ha una cupola color oro.", "Dentro c'è la Madonna Nera. Tante persone vanno a trovarla."],
      word: ["Pellegrino", "Una persona che fa un lungo viaggio per andare in un posto speciale."],
      facts: ["Da lassù si vede il mare.", "Con il cannocchiale si guarda lontano."] },
    c: { q: "Quale statua dal volto scuro è venerata nel Santuario di Tindari?",
      story: ["Il Santuario della Madonna del Tindari sorge su una rupe a picco sul mare ed è uno dei luoghi di pellegrinaggio più importanti della Sicilia.",
              "Custodisce la Madonna Nera, una statua dal volto scuro molto venerata. Ogni anno, soprattutto a settembre, arrivano pellegrini da tutta l'isola e anche da più lontano.",
              "Il santuario domina il paesaggio: la sua cupola dorata si vede da lontano e fa da punto di riferimento."],
      word: ["Pellegrinaggio", "Viaggio compiuto per devozione verso un luogo sacro. Chi lo compie si chiama pellegrino."],
      facts: ["Dalla terrazza panoramica lo sguardo arriva ai laghetti di Marinello e, nelle giornate limpide, alle isole Eolie.",
              "Il cannocchiale sul belvedere permette di osservare il paesaggio nei dettagli: provate a individuare il mare, la sabbia e i laghetti."] },
  },
  teatro: {
    a: { q: "Come si chiama la parte con i gradini per il pubblico?",
      story: ["Questo è un teatro molto antico.", "Le persone si sedevano sui gradini.", "Guardavano gli attori recitare."],
      word: ["Cavea", "I gradini dove si siede il pubblico."],
      facts: ["Dai gradini si vede il mare.", "Anche oggi qui si fanno gli spettacoli."] },
    c: { q: "Come si chiama la parte a semicerchio del teatro dove si siede il pubblico?",
      story: ["Il teatro di Tindari fu costruito dai Greci tra il IV e il III secolo a.C., sfruttando la pendenza naturale della collina: i gradini poggiano direttamente sul pendio.",
              "In età romana fu modificato per ospitare anche altri spettacoli, come i combattimenti dei gladiatori. Oggi è usato per gli spettacoli estivi, con il mare sullo sfondo."],
      word: ["Cavea", "La parte a semicerchio del teatro, con i gradini dove si siede il pubblico."],
      facts: ["Davanti al teatro si apre il mare: gli spettatori avevano un panorama bellissimo dietro gli attori.",
              "I teatri antichi erano progettati con grande attenzione all'acustica: anche chi sedeva in alto riusciva a sentire bene le voci."] },
  },
  domus: {
    a: { q: "Con che cosa si fa un mosaico?",
      story: ["Qui vivevano le famiglie dei Romani.", "Le case sono fatte con grandi pietre.", "Si chiamano domus."],
      word: ["Domus", "La casa di una famiglia romana."],
      facts: ["Dietro gli scavi ci sono le case di oggi.", "I pavimenti erano fatti con tanti pezzetti colorati."] },
    c: { q: "Con che cosa si realizza un mosaico?",
      story: ["In quest'area, chiamata Isolato IV, gli archeologi hanno scoperto le domus: le abitazioni delle famiglie romane benestanti, costruite con grandi blocchi di pietra ben squadrati e organizzate attorno a un cortile.",
              "Un gruppo di case unite era detto insula, che in latino significa «isola»: un isolato circondato dalle strade, come i nostri quartieri."],
      word: ["Domus", "La casa di una famiglia romana benestante, con le stanze disposte attorno a un cortile."],
      facts: ["Dietro gli scavi si vedono le case del paese di oggi: la città moderna vive accanto a quella antica.",
              "I pavimenti di alcune stanze erano decorati con mosaici, composti da moltissime piccole tessere di pietra colorata."] },
  },
  basilica: {
    a: { q: "Chi ha costruito la Basilica?",
      story: ["Qui c'era un grande edificio dei Romani.", "Oggi restano solo grandi archi di pietra.", "Passa sotto l'arco: è altissimo!"],
      word: ["Basilica", "Un grande edificio dove i Romani si incontravano."],
      facts: ["Dietro gli archi si vede una cupola d'oro.", "Gli archi romani stanno in piedi da duemila anni."] },
    c: { q: "Quale popolo costruì la Basilica di Tindari?",
      story: ["La Basilica fu costruita in età romana, quando Tindari si arricchì di grandi edifici pubblici. Era un luogo coperto e monumentale, centro della vita cittadina: ci si incontrava, si discuteva e si trattavano affari.",
              "Oggi ne restano imponenti archi in blocchi di pietra, che mostrano l'abilità dei costruttori romani."],
      word: ["Basilica", "Nell'antica Roma, grande edificio pubblico coperto, sede di incontri e affari. Solo più tardi il termine è passato a indicare anche certe chiese."],
      facts: ["Dietro gli archi spunta la cupola dorata del Santuario: in uno stesso sguardo si vedono epoche molto diverse.",
              "L'arco permette di coprire grandi aperture scaricando il peso sui lati: per questo molte opere romane sono arrivate fino a noi."] },
  },
  antiquarium: {
    a: { q: "Chi studia gli oggetti antichi trovati sotto terra?",
      story: ["Nel museo ci sono tanti oggetti antichi.", "Ci sono vasi, anfore e monete.", "Gli archeologi li hanno trovati sotto terra."],
      word: ["Reperto", "Un oggetto antico trovato sotto terra."],
      facts: ["Il pannello spiega dove sono stati trovati gli oggetti.", "Gli oggetti vengono puliti con cura."] },
    c: { q: "Quale professionista studia gli oggetti antichi trovati negli scavi?",
      story: ["L'Antiquarium conserva i reperti emersi dagli scavi di Tindari: vasi, anfore, monete, statue e oggetti d'uso quotidiano.",
              "Gli archeologi li studiano come indizi: da ogni oggetto ricavano informazioni su come vivevano, lavoravano e commerciavano le persone del passato."],
      word: ["Reperto", "Qualsiasi oggetto antico recuperato durante uno scavo e studiato per ricostruire il passato."],
      facts: ["I pannelli sulle pareti spiegano dove e come sono stati trovati gli oggetti, con mappe e disegni.",
              "Prima dell'esposizione i reperti vengono puliti, catalogati e, se serve, restaurati."] },
  },
  laghi: {
    a: { q: "Che cosa c'è tra i laghetti e il mare?",
      story: ["Vicino al mare ci sono dei laghetti.", "Uno si chiama Lago Verde.", "Una striscia di sabbia li divide dal mare."],
      word: ["Laguna", "Un piccolo lago vicino al mare."],
      facts: ["Qui vivono uccelli e pesci.", "Il vento sposta la sabbia."] },
    c: { q: "Che cosa separa le lagune di Marinello dal mare?",
      story: ["Ai piedi della rupe di Tindari si estende la Riserva Naturale Orientata di Marinello: un insieme di piccole lagune, tra cui il Lago Verde, separate dal mare da un cordone di sabbia.",
              "È un ambiente delicato e ricco di vita: ospita uccelli, pesci e piante adatte al terreno sabbioso. Vento e onde ne modellano di continuo le dune."],
      word: ["Laguna", "Specchio d'acqua poco profondo, separato dal mare da una stretta striscia di terra, di solito sabbiosa."],
      facts: ["Una riserva naturale è un'area protetta: si osserva senza disturbare e senza lasciare rifiuti.",
              "Alcuni uccelli migratori fanno sosta qui durante i loro lunghi viaggi."] },
  },
};

// Testi di una tappa per il livello richiesto ("a", "b" o "c"); "b" = testi base.
function testi(spot, tier) {
  const v = ((VARIANTI[spot.id] || {})[tier]) || {};
  return {
    story: v.story || spot.story, word: v.word || spot.word, facts: v.facts || spot.facts,
    q: v.q || spot.quiz.q,
  };
}
