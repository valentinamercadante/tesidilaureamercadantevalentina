// Estrae da data.js tutti i testi da leggere ad alta voce (uno per file audio) e li stampa in JSON.
// La chiave è il nome del file in audio/ (senza .mp3): <tappa>-<story|word|facts|quiz>-<livello a|b|c>.
const fs = require("fs"), vm = require("vm"), path = require("path");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8") + ";this.o={SPOTS,GUIDA,INTRO,testi}", ctx);
const { SPOTS, GUIDA, INTRO, testi } = ctx.o, out = {};
for (const s of SPOTS) for (const tier of ["a", "b", "c"]) {
  const t = testi(s, tier);
  out[`${s.id}-story-${tier}`] = t.story.join(" ");
  out[`${s.id}-word-${tier}`] = "Parola nuova: " + t.word.join(". ");
  out[`${s.id}-facts-${tier}`] = t.facts.join(" ");
  out[`${s.id}-quiz-${tier}`] = t.q + " " + s.quiz.options.map((o, i) => "Risposta " + "ABC"[i] + ": " + o).join(". ");
}
out["guida-home"] = GUIDA.home; out["guida-stop"] = GUIDA.stop; out["intro"] = INTRO;
// pronuncia: sostituzioni per il sintetizzatore
const fix = (t) => t.replace(/Isolato IV/g, "Isolato quarto").replace(/«\?»/g, "il punto interrogativo")
  .replace(/[«»]/g, "").replace(/\ba\.C\./g, "avanti Cristo").replace(/\bIII\b/g, "terzo").replace(/\bIV\b/g, "quarto");
for (const k in out) out[k] = fix(out[k]);
console.log(JSON.stringify(out, null, 1));
