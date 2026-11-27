# Tindari – La lezione illustrata

Lezione interattiva sul **Parco Archeologico di Tindari** per la scuola primaria (6-10 anni).
Una mappa illustrata guida i bambini alla scoperta di 6 tappe: il Santuario, il Teatro Greco,
le Case Romane (Isolato IV), la Basilica, il Museo e il Lago Verde con i laghetti di Marinello.

🌐 **Sito online:** https://valentinamercadante.github.io/tesidilaureamercadantevalentina/

## Come funziona

- **Mappa illustrata** con segnaposto numerati: si sceglie una tappa dalla mappa o dall'elenco.
- **Punti da scoprire** nelle immagini: ogni «?» apre la storia, una parola nuova o una curiosità.
- **Quiz** per ogni tappa: risposta giusta = timbro ★ e punti (10 al primo tentativo, 5 al secondo, 2 poi).
- **Lettura ad alta voce** con una voce italiana naturale (file audio in `audio/`), per i bambini che leggono ancora con fatica. Se un file audio manca, si usa la voce del browser.
- **Linea del tempo** della storia di Tindari.
- **Attestato di Piccolo Archeologo** stampabile o salvabile in PDF, con spazio per la firma dello studente e dell'insegnante.
- **Selettore di classe** (1ª-5ª elementare) in alto: cambia i testi su tre livelli di lettura (1ª-2ª frasi brevissime, 3ª testi base, 4ª-5ª testi più ricchi), la grandezza del carattere (più grande nelle prime classi) e la lettura ad alta voce; in 1ª si usa lo stampatello maiuscolo. La classe scelta compila anche l'attestato.
- Pulsante **Daltonismo**: palette sicura (blu e giallo al posto di verde e rosso) e segni oltre al colore (✓ e ✗, forme diverse per le tappe completate). La scelta resta salvata.
- Pulsante **Ricomincia** per azzerare punti e timbri (utile sui computer condivisi).

I progressi restano salvati nel browser del dispositivo.

## Uso in locale

Non serve installare nulla: basta aprire `index.html` con un browser.

## Struttura

| File | Contenuto |
|------|-----------|
| `index.html` | Struttura della pagina |
| `style.css` | Stile grafico (palette ripresa dalle illustrazioni) |
| `data.js` | Testi, tappe, quiz, posizione di segnaposto e punti, crediti |
| `app.js` | Logica: mappa, punti, quiz, attestato |
| `img/` | Illustrazioni |
| `audio/` | Letture ad alta voce (mp3): una per ogni testo e per ogni livello (a, b, c) |
| `tools/` | Script per rigenerare gli audio dopo aver cambiato i testi |

## Personalizzare i contenuti

Quasi tutto si modifica in `data.js`:

- **Testi e quiz** di ogni tappa: quelli base in `SPOTS` (livello 3ª), le versioni per le altre classi in `VARIANTI`;
- **Posizione** dei segnaposto (`pin`) e dei punti «?» (`hs`), in percentuale rispetto all'immagine;
- **Crediti** nel tooltip «Informazioni» (`CREDITS`): autore, anno di laurea, ateneo e disclaimer;
- **Logo** dell'università: `img/logo-kore.svg` (se manca compare il nome a testo).

## Voce

Gli audio sono generati con [Piper](https://github.com/OHF-Voice/piper1-gpl), sintesi vocale libera e offline,
con la voce italiana «Paola» (dati con licenza CC0). Se si modificano i testi in `data.js`,
si rigenerano con `python3 tools/genera_audio.py` (istruzioni nel file).

## Crediti e disclaimer

Progetto a cura di **Valentina Mercadante** – Università degli Studi di Enna «Kore», anno accademico 2026/2027.

Il logo dell'Università degli Studi di Enna «Kore» è di proprietà dell'ateneo ed è riportato a solo scopo di identificazione.

Materiale didattico a scopo illustrativo. Le immagini sono rielaborazioni a fumetto e i testi sono
semplificati per i bambini: non sostituiscono la visita né le fonti ufficiali del Parco Archeologico di Tindari.
