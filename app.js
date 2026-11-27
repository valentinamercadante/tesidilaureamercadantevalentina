const $ = (id) => document.getElementById(id);
const KEY = "tindari-lezione-v1";
let st = { stamped: [], opened: {}, points: 0, wrong: {} };
try { Object.assign(st, JSON.parse(localStorage.getItem(KEY)) || {}); } catch {}
const save = () => localStorage.setItem(KEY, JSON.stringify(st));
let cur = null, imgIdx = 0;

const LOGO = `<circle r="36" fill="#d9a441" stroke="#3a2a1d" stroke-width="3"/>
  <rect x="-18" y="-22" width="36" height="7" rx="2" fill="#f4ecd8" stroke="#3a2a1d" stroke-width="2.4"/>
  <rect x="-11" y="-15" width="22" height="32" fill="#f4ecd8" stroke="#3a2a1d" stroke-width="2.4"/>
  <path d="M-5 -15 v32 M0 -15 v32 M5 -15 v32" stroke="#bfae86" stroke-width="1.6"/>
  <rect x="-18" y="17" width="36" height="7" rx="2" fill="#f4ecd8" stroke="#3a2a1d" stroke-width="2.4"/>`;

// ---------- Voce ----------
function speak(t) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t); u.lang = "it-IT"; u.rate = 0.92;
  const v = speechSynthesis.getVoices().find((x) => x.lang.startsWith("it")); if (v) u.voice = v;
  speechSynthesis.speak(u);
}
const hush = () => "speechSynthesis" in window && speechSynthesis.cancel();

// ---------- Adattamento immagine (contain) ----------
function fit(box, el, w, h) {
  const bw = box.clientWidth - 24, bh = box.clientHeight - 24;
  const r = w / h; let ew = bw, eh = bw / r;
  if (eh > bh) { eh = bh; ew = bh * r; }
  el.style.width = ew + "px"; el.style.height = eh + "px";
}
function refit() {
  if (!$("home").classList.contains("hidden")) fit($("mapbox"), $("mapframe"), MAP.w, MAP.h);
  if (cur) { const im = cur.images[imgIdx]; fit($("stage"), $("frame"), im.w, im.h); }
}

// ---------- HUD ----------
function hud() {
  $("pts").textContent = `${st.points} punti`;
  $("stp").textContent = `${st.stamped.length}/${SPOTS.length} timbri`;
}

// ---------- Mappa ----------
function drawHome() {
  $("mapimg").src = MAP.src;
  $("pins").innerHTML = SPOTS.map((s, i) => `
    <button class="pin${st.stamped.includes(s.id) ? " done" : ""}" style="left:${s.pin[0]}%;top:${s.pin[1]}%" data-id="${s.id}" aria-label="${s.name}">
      <span class="drop"></span><span class="n">${st.stamped.includes(s.id) ? "✓" : i + 1}</span><span class="lbl">${s.name}</span></button>`).join("");
  $("legend").innerHTML = SPOTS.map((s, i) => `<li><button data-id="${s.id}" class="${st.stamped.includes(s.id) ? "done" : ""}"><span class="num">${st.stamped.includes(s.id) ? "✓" : i + 1}</span>${s.name}</button></li>`).join("");
  hud();
}

// ---------- Tappa ----------
function openStop(id) {
  hush();
  cur = SPOTS.find((s) => s.id === id); imgIdx = 0;
  $("home").classList.add("hidden"); $("stop").classList.remove("hidden");
  $("era").textContent = cur.era; $("s-title").textContent = cur.name;
  $("s-intro").textContent = cur.story[0];
  drawStop();
}
function drawStop() {
  const im = cur.images[imgIdx], op = st.opened[cur.id] || [];
  $("photo").src = im.src; $("photo").alt = im.cap || cur.name;
  $("hots").innerHTML = cur.hs.filter((h) => h.img === imgIdx).map((h) => `
    <button class="hot${op.includes(h.k) ? " done" : ""}" style="left:${h.x}%;top:${h.y}%" data-k="${h.k}" aria-label="${h.label}">
      ${op.includes(h.k) ? "✓" : "?"}<span class="t">${h.label}</span></button>`).join("");
  $("thumbs").innerHTML = cur.images.length > 1 ? cur.images.map((m, i) =>
    `<button data-i="${i}" class="${i === imgIdx ? "on" : ""}">${m.cap || "Veduta " + (i + 1)}</button>`).join("") : "";
  const labels = { story: "La storia", word: "Parola nuova", facts: "Lo sapevi?" };
  $("checklist").innerHTML = cur.hs.map((h) => {
    const on = op.includes(h.k);
    const where = cur.images.length > 1 ? ` <small>(veduta ${h.img + 1})</small>` : "";
    return `<li class="${on ? "on" : ""}"><span class="dot">${on ? "✓" : "?"}</span><span>${labels[h.k]}: <b>${h.label}</b>${where}</span></li>`;
  }).join("");
  const done = st.stamped.includes(cur.id);
  $("quizbtn").textContent = done ? "Timbro ottenuto ★ (rivedi il quiz)" : "Metti alla prova: quiz";
  $("quizbtn").classList.toggle("done", done);
  hud(); refit();
}
function backHome() {
  hush(); closeCard(true); cur = null;
  $("stop").classList.add("hidden"); $("home").classList.remove("hidden");
  drawHome(); refit();
  if (st.stamped.length === SPOTS.length) showWin();
}
function step(d) { const i = SPOTS.indexOf(cur); closeCard(true); openStop(SPOTS[(i + d + SPOTS.length) % SPOTS.length].id); }

// ---------- Schede ----------
function openCard(title, html, say) {
  $("c-title").textContent = title; $("c-body").innerHTML = html;
  $("c-next").classList.add("hidden"); $("card").classList.remove("hidden");
  $("c-listen").onclick = () => speak(say); speak(say);
}
function closeCard(silent) { hush(); $("card").classList.add("hidden"); }
function addPoints(n, why) {
  st.points += n; save();
  const f = document.createElement("div"); f.className = "float"; f.textContent = `+${n} ${why}`;
  document.body.appendChild(f); setTimeout(() => f.remove(), 1600);
}
function openHot(k) {
  const op = (st.opened[cur.id] = st.opened[cur.id] || []);
  const hot = cur.hs.find((h) => h.k === k);
  let title, html, say;
  if (k === "story") { title = hot.label + " – la storia"; html = cur.story.map((p) => `<p>${p}</p>`).join(""); say = cur.story.join(" "); }
  if (k === "word") { title = "Parola nuova: " + cur.word[0]; html = `<p>${cur.word[1]}</p>`; say = "Parola nuova: " + cur.word.join(". "); }
  if (k === "facts") { title = "Lo sapevi?"; html = `<ul>${cur.facts.map((f) => `<li>${f}</li>`).join("")}</ul>`; say = cur.facts.join(" "); }
  openCard(title, html, say);
  if (!op.includes(k)) { op.push(k); addPoints(3, "curiosità"); save(); drawStop(); }
}
function openQuiz() {
  const q = cur.quiz, got = st.stamped.includes(cur.id);
  const say = q.q + " " + q.options.map((o, i) => "Risposta " + "ABC"[i] + ": " + o).join(". ");
  openCard("Quiz: " + cur.name,
    `<p class="q">${q.q}</p><div class="opts">${q.options.map((o, i) => `<button class="opt${got && i === q.answer ? " right" : ""}" data-i="${i}" ${got ? "disabled" : ""}>${"ABC"[i]}. ${o}</button>`).join("")}</div><div id="fb" class="fb">${got ? "Timbro già ottenuto!" : ""}</div>`, say);
  if (got) { $("c-next").classList.remove("hidden"); return; }
  $("c-body").querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
    const fb = $("fb");
    if (+b.dataset.i === q.answer) {
      const w = st.wrong[cur.id] || 0, pts = w === 0 ? 10 : w === 1 ? 5 : 2;
      st.stamped.push(cur.id); save();
      b.classList.add("right"); $("c-body").querySelectorAll(".opt").forEach((x) => (x.disabled = true));
      fb.className = "fb good"; fb.textContent = `Esatto! Timbro ★ e +${pts} punti`;
      addPoints(pts, "quiz"); drawStop(); $("c-next").classList.remove("hidden");
    } else {
      st.wrong[cur.id] = (st.wrong[cur.id] || 0) + 1; save();
      b.classList.add("wrong"); b.disabled = true;
      fb.className = "fb bad"; fb.textContent = "Quasi! Riprova: cerca i punti nell'immagine.";
    }
  }));
}
function nextUnstamped() {
  const i = SPOTS.indexOf(cur);
  for (let k = 1; k <= SPOTS.length; k++) { const s = SPOTS[(i + k) % SPOTS.length]; if (!st.stamped.includes(s.id)) return s.id; }
  return null;
}

// ---------- Fine e attestato ----------
function showWin() { $("win-pts").textContent = `Avete raccolto ${st.points} punti e tutti i timbri. Scrivete la classe per creare l'attestato.`; $("win").classList.remove("hidden"); }
async function printCert() {
  $("cert-class").textContent = $("classe").value.trim() || "\u00a0";
  $("cert-pts").textContent = st.points;
  $("cert-date").textContent = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  $("cert-stops").innerHTML = SPOTS.map((s) => `<figure><img src="${s.images[0].src}" alt=""><span class="star">★</span><figcaption>${s.name}</figcaption></figure>`).join("");
  $("cert-by").textContent = `Progetto a cura di ${CREDITS.autore} · ${CREDITS.ateneo}`;
  const k = $("cert-kore"); k.innerHTML = "";
  const logo = new Image(); logo.alt = CREDITS.ateneo; logo.src = "img/logo-kore.svg";
  try { await logo.decode(); k.appendChild(logo); } catch { /* senza logo: il nome è già nella riga accanto */ }
  await Promise.all([...document.querySelectorAll("#cert-stops img")].map((i) => i.decode().catch(() => {})));
  window.print();
}

// ---------- Eventi ----------
$("pins").addEventListener("click", (e) => { const p = e.target.closest(".pin"); if (p) openStop(p.dataset.id); });
$("legend").addEventListener("click", (e) => { const p = e.target.closest("button"); if (p) openStop(p.dataset.id); });
$("hots").addEventListener("click", (e) => { const h = e.target.closest(".hot"); if (h) openHot(h.dataset.k); });
$("thumbs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { imgIdx = +b.dataset.i; drawStop(); } });
$("quizbtn").onclick = openQuiz;
document.querySelectorAll(".guide").forEach((g) => {
  g.querySelector(".bubble").textContent = GUIDA[g.dataset.say];
  g.onclick = () => speak(GUIDA[g.dataset.say]);
});
$("back").onclick = backHome;
$("prev").onclick = () => step(-1); $("next").onclick = () => step(1);
$("card-x").onclick = () => closeCard();
$("c-next").onclick = () => { closeCard(); const n = nextUnstamped(); if (n) openStop(n); else backHome(); };
$("btn-time").onclick = () => $("timeline").classList.remove("hidden");
$("btn-intro").onclick = () => speak(INTRO);
document.querySelectorAll("[data-close]").forEach((b) => (b.onclick = () => $(b.dataset.close).classList.add("hidden")));
$("print").onclick = printCert;
$("btn-reset").onclick = () => { $("confirm").classList.remove("hidden"); $("cf-no").focus(); };
$("cf-no").onclick = () => $("confirm").classList.add("hidden");
$("cf-yes").onclick = () => {
  $("confirm").classList.add("hidden");
  st = { stamped: [], opened: {}, points: 0, wrong: {} }; save(); closeCard(); hush();
  $("win").classList.add("hidden"); if (cur) backHome(); else drawHome();
};
$("again").onclick = () => { st = { stamped: [], opened: {}, points: 0, wrong: {} }; save(); $("win").classList.add("hidden"); if (cur) backHome(); else drawHome(); };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!$("confirm").classList.contains("hidden")) return $("confirm").classList.add("hidden"); if (!$("card").classList.contains("hidden")) closeCard(); else if (cur) backHome(); } });
window.addEventListener("resize", refit);
$("mapimg").addEventListener("load", refit); $("photo").addEventListener("load", refit);

$("info-tip").innerHTML = `<p>Progetto a cura di <b>${CREDITS.autore}</b>${CREDITS.annoLaurea ? `, laureata nell'anno accademico <b>${CREDITS.annoLaurea}</b>` : ""}.</p><p>${CREDITS.ateneo}</p><p>${CREDITS.disclaimer}</p>`;
$("info-btn").onclick = (e) => { const s = $("info-tip").classList.toggle("show"); e.currentTarget.setAttribute("aria-expanded", s); };
document.addEventListener("click", (e) => { if (!e.target.closest(".info")) $("info-tip").classList.remove("show"); });
const koreFallback = () => { const l = $("kore-logo"); if (!l) return; const t = document.createElement("span"); t.className = "kore-text"; t.textContent = CREDITS.ateneo; l.replaceWith(t); };
$("kore-logo").onerror = koreFallback;
if ($("kore-logo").complete && $("kore-logo").naturalWidth === 0) koreFallback();
$("logo").innerHTML = LOGO; $("cert-logo").innerHTML = LOGO; $("cert-logo2").innerHTML = LOGO;
$("tl-list").innerHTML = TIMELINE.map(([d, t]) => `<li><b>${d}</b><span>${t}</span></li>`).join("");
if ("speechSynthesis" in window) speechSynthesis.getVoices();
drawHome(); refit();
