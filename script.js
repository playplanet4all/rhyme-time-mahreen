/* ==========================================================
   Rhyme Time: a kids' rhyming game for Mahreen, from Yusrah
   Play Planet · kids learning game (under 10)
   ========================================================== */

/* ==========================================================
   ✏️ CONFIG: everything personal lives here. Edit freely!
   ========================================================== */
const CONFIG = {
  from: "Yusrah",            // who made the game
  to: "Mahreen",             // the child who plays

  greeting: "Hi Mahreen! 👋",
  introText: "Can you find the words that rhyme? Listen, look at the pictures, and tap the right one!",

  timerSeconds: 30,          // seconds per question (a gentle sand-timer). 0 = no timer

  sound: {
    readAloud: true,         // show the "Read it to me" button (uses the phone's own voice)
    autoRead: true,          // read each question out loud automatically
    effects: true,           // little "ding" sounds
    voiceLang: "en-GB",      // accent of the voice, e.g. "en-GB", "en-US", "en-IN"
  },

  // Reward screen badges (by how many stars she gets). Kind words only!
  badges: [
    { min: 10, sticker: "🌟", title: "Rhyme Superstar!", msg: "Every single one! You are a real rhyme superstar, {to}!" },
    { min: 7,  sticker: "🏆", title: "Rhyme Champion!",  msg: "Wow, so many stars! You have super rhyming ears, {to}!" },
    { min: 4,  sticker: "🎈", title: "Rhyme Explorer!",  msg: "Great job, {to}! Every time you play, your ears get better at rhymes." },
    { min: 0,  sticker: "🌱", title: "Rhyme Sprout!",    msg: "Well done for trying, {to}! Rhymes are tricky. Want to play again?" },
  ],

  signoff: "— Eden👲",

  // WhatsApp: number with country code, digits only. "" hides the button.
  whatsapp: {
    number: "917989381957",
    buttonText: "Send my stars to {from} 💬",
    text: "I played Rhyme Time and got {stars} out of {total} stars! ⭐",
  },

  // Small "Made with Play Planet" line. Turned OFF for this game, as requested.
  brand: { show: false, text: "Made with Play Planet 🪐" },
};

/* ==========================================================
   ✏️ QUESTIONS
   Put *stars* around a word in q to underline it.
   options: { emoji, word }. correct: index of the right one (0 = first).
   right / wrong: what she hears after answering (always kind!).
   hint: shown when she taps "Help me".
   Nursery rhymes used here are traditional (public domain).
   ========================================================== */
const QUESTIONS = [
  {
    emoji: "🐱",
    q: "Which word rhymes with *cat*?",
    options: [{ emoji: "🎩", word: "hat" }, { emoji: "🐶", word: "dog" }, { emoji: "☀️", word: "sun" }, { emoji: "🥤", word: "cup" }],
    correct: 0,
    hint: "Say it slowly: c-AT… h-?",
    right: "Yes! Cat and hat both end in -at! 🎩",
    wrong: "Good try! It's hat. Cat and hat both end in -at 🎩",
  },
  {
    emoji: "🐝",
    q: "Which word rhymes with *bee*?",
    options: [{ emoji: "🌸", word: "flower" }, { emoji: "🌳", word: "tree" }, { emoji: "🍯", word: "honey" }, { emoji: "🐻", word: "bear" }],
    correct: 1,
    hint: "Bees love flowers, but which one sounds like b-EE?",
    right: "Buzz buzz! Bee and tree both end in -ee! 🌳",
    wrong: "Nice try! It's tree. Bee and tree both end in -ee 🌳",
  },
  {
    emoji: "🐟",
    q: "Which word rhymes with *fish*?",
    options: [{ emoji: "🦈", word: "shark" }, { emoji: "🌊", word: "sea" }, { emoji: "🍽️", word: "dish" }, { emoji: "🐠", word: "nemo" }],
    correct: 2,
    hint: "Something you eat from at dinner time 🍽️",
    right: "Splash! Fish and dish both end in -ish! 🍽️",
    wrong: "Almost! It's dish. Fish and dish both end in -ish 🍽️",
  },
  {
    emoji: "🦆",
    q: "Which word rhymes with *duck*?",
    options: [{ emoji: "🚚", word: "truck" }, { emoji: "🐸", word: "frog" }, { emoji: "💧", word: "pond" }, { emoji: "🥚", word: "egg" }],
    correct: 0,
    hint: "It goes vroom vroom on the road 🛣️",
    right: "Quack quack! Duck and truck both end in -uck! 🚚",
    wrong: "Good try! It's truck. Duck and truck both end in -uck 🚚",
  },
  {
    emoji: "🐸",
    q: "Which word rhymes with *frog*?",
    options: [{ emoji: "🪷", word: "lily" }, { emoji: "🐛", word: "bug" }, { emoji: "🪵", word: "log" }, { emoji: "🐞", word: "ladybird" }],
    correct: 2,
    hint: "The frog likes to sit on it in the pond 🪵",
    right: "Ribbit! Frog and log both end in -og! 🪵",
    wrong: "Nice try! It's log. Frog and log both end in -og 🪵",
  },
  {
    emoji: "✨",
    q: "Finish the rhyme: \"Twinkle, twinkle, little ___\"",
    options: [{ emoji: "🚗", word: "car" }, { emoji: "⭐", word: "star" }, { emoji: "🌙", word: "moon" }, { emoji: "🐱", word: "cat" }],
    correct: 1,
    hint: "It twinkles up in the night sky… and it's on the reward screen! ⭐",
    right: "Yes! \"How I wonder what you are!\" Star and are rhyme ⭐",
    wrong: "Good try! It's star. \"How I wonder what you are!\" ⭐",
  },
  {
    emoji: "🥚",
    q: "Finish the rhyme: \"Humpty Dumpty sat on a ___\"",
    options: [{ emoji: "⚽", word: "ball" }, { emoji: "🪑", word: "chair" }, { emoji: "🧱", word: "wall" }, { emoji: "🌳", word: "tree" }],
    correct: 2,
    hint: "\"…Humpty Dumpty had a great FALL.\" What rhymes with fall?",
    right: "Yes! Wall and fall rhyme. Poor Humpty! 🧱",
    wrong: "Almost! It's wall, because it rhymes with fall 🧱",
  },
  {
    emoji: "🐑",
    q: "Finish the rhyme: \"Baa, baa, black sheep, have you any ___?\"",
    options: [{ emoji: "🧶", word: "wool" }, { emoji: "🥛", word: "milk" }, { emoji: "🌾", word: "grass" }, { emoji: "🧸", word: "toys" }],
    correct: 0,
    hint: "\"Yes sir, yes sir, three bags FULL.\" What rhymes with full?",
    right: "Yes sir! Wool and full rhyme. Three bags full! 🧶",
    wrong: "Good try! It's wool. \"Three bags full!\" 🧶",
  },
  {
    emoji: "🐭",
    q: "Finish the rhyme: \"Hickory, dickory, dock, the mouse ran up the ___\"",
    options: [{ emoji: "🧀", word: "cheese" }, { emoji: "🕰️", word: "clock" }, { emoji: "🪜", word: "stairs" }, { emoji: "🏠", word: "house" }],
    correct: 1,
    hint: "Listen: dick-ory, DOCK… it's something that goes tick-tock!",
    right: "Tick tock! Dock and clock both end in -ock! 🕰️",
    wrong: "Nice try! It's clock. Dock and clock both end in -ock 🕰️",
  },
  {
    emoji: "💧",
    q: "Finish the rhyme: \"Jack and Jill went up the ___\"",
    options: [{ emoji: "🛝", word: "slide" }, { emoji: "🏫", word: "school" }, { emoji: "⛰️", word: "hill" }, { emoji: "🌉", word: "bridge" }],
    correct: 2,
    hint: "It rhymes with J-ILL ⛰️",
    right: "Yes! Jill and hill both end in -ill! ⛰️",
    wrong: "Good try! It's hill. Jill and hill both end in -ill ⛰️",
  },
];

const TIMEOUT_LINE = "⏰ Time's up! That's okay. ";

/* ==========================================================
   Helpers (no need to edit below this line)
   ========================================================== */
const $ = (id) => document.getElementById(id);
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fill = (t, extra = {}) => {
  let s = String(t).replaceAll("{from}", CONFIG.from).replaceAll("{to}", CONFIG.to);
  for (const k in extra) s = s.replaceAll(`{${k}}`, extra[k]);
  return s;
};
const plain = (t) => fill(t).replace(/\*/g, "");

/** Put text into an element, turning *word* into <em>word</em> safely (no innerHTML). */
function setRich(el, text) {
  el.textContent = "";
  fill(text).split(/(\*[^*]+\*)/).forEach((part) => {
    if (/^\*[^*]+\*$/.test(part)) {
      const em = document.createElement("em");
      em.textContent = part.slice(1, -1);
      el.appendChild(em);
    } else if (part) el.appendChild(document.createTextNode(part));
  });
}

function showScreen(from, to) {
  const swap = () => { from.hidden = true; from.classList.remove("leaving"); to.hidden = false; to.scrollTop = 0; };
  if (REDUCED) return swap();
  from.classList.add("leaving");
  setTimeout(swap, 340);
}

/* ----- sound: read-aloud + tiny effects, all behind one mute button ----- */
let muted = false;
const canSpeak = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

function speak(text) {
  if (muted || !canSpeak || !CONFIG.sound.readAloud) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = CONFIG.sound.voiceLang;
    u.rate = 0.85;
    u.pitch = 1.1;
    speechSynthesis.speak(u);
  } catch (_) { /* no voice on this device; the game still works */ }
}
function stopSpeaking() { try { if (canSpeak) speechSynthesis.cancel(); } catch (_) {} }

let audioCtx = null;
function ding(good) {
  if (muted || !CONFIG.sound.effects) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = good ? [660, 880, 1320] : [440, 330];
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      const t = audioCtx.currentTime + i * 0.11;
      o.type = "triangle"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.connect(g).connect(audioCtx.destination);
      o.start(t); o.stop(t + 0.3);
    });
  } catch (_) {}
}

$("muteBtn").addEventListener("click", () => {
  muted = !muted;
  $("muteBtn").textContent = muted ? "🔇" : "🔊";
  $("muteBtn").setAttribute("aria-pressed", String(muted));
  $("muteBtn").setAttribute("aria-label", muted ? "Sound off" : "Sound on");
  if (muted) stopSpeaking();
});

/* ===== Floating background ===== */
(function makeFloaters() {
  if (REDUCED) return;
  const box = $("bgFloat");
  const emojis = ["⭐", "🎵", "✏️", "🌙", "⭐", "🎶"];
  const count = window.innerWidth < 600 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.textContent = emojis[i % emojis.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 16 + Math.random() * 20 + "px";
    s.style.animationDuration = 12 + Math.random() * 14 + "s";
    s.style.animationDelay = -Math.random() * 20 + "s";
    box.appendChild(s);
  }
})();

if (CONFIG.brand && CONFIG.brand.show) {
  document.querySelectorAll(".card").forEach((c) => {
    const p = document.createElement("p");
    p.style.cssText = "margin:16px 0 0;font-size:.8rem;color:#555";
    p.textContent = CONFIG.brand.text;
    c.appendChild(p);
  });
}

/* ==========================================================
   1. INTRO
   ========================================================== */
document.title = `Rhyme Time for ${CONFIG.to} ⭐`;
$("greeting").textContent = fill(CONFIG.greeting);
$("introText").textContent = fill(CONFIG.introText);
$("introSmall").textContent =
  `${QUESTIONS.length} rhymes` + (CONFIG.timerSeconds ? ` · ${CONFIG.timerSeconds} seconds each` : "") +
  (CONFIG.sound.readAloud && canSpeak ? " · tap 🔊 to listen" : "");
$("readBtn").hidden = !(CONFIG.sound.readAloud && canSpeak);

$("startBtn").addEventListener("click", () => {
  startGame();
  showScreen($("introScreen"), $("playScreen"));
});

/* ==========================================================
   2. PLAY
   ========================================================== */
let qIndex = 0, stars = 0, live = null;
const picked = [];

function startGame() {
  qIndex = 0; stars = 0; picked.length = 0;
  renderQuestion();
}

let timerRaf = null, timerEnd = 0;
function startTimer() {
  stopTimer();
  const wrap = $("timerWrap");
  if (!CONFIG.timerSeconds) { wrap.hidden = true; return; }
  wrap.hidden = false;
  timerEnd = performance.now() + CONFIG.timerSeconds * 1000;
  const step = () => {
    const left = Math.max(0, timerEnd - performance.now());
    $("timerBar").style.width = (left / (CONFIG.timerSeconds * 1000)) * 100 + "%";
    $("timerNum").textContent = `⏳ ${Math.ceil(left / 1000)}`;
    if (left <= 0) { timerRaf = null; answer(-1); return; }
    timerRaf = requestAnimationFrame(step);
  };
  step();
}
function stopTimer() { if (timerRaf) cancelAnimationFrame(timerRaf); timerRaf = null; }

function readQuestion() {
  if (!live) return;
  const item = QUESTIONS[qIndex];
  speak(plain(item.q).replace("___", "blank") + " … " + live.options.map((o) => o.word).join(", … "));
}

function renderQuestion() {
  const item = QUESTIONS[qIndex];
  // shuffle the picture order every play, so the next friend can't just copy
  const order = shuffle(item.options.map((_, i) => i));
  live = { options: order.map((i) => item.options[i]), correct: order.indexOf(item.correct), answered: false };

  $("qCount").textContent = `${qIndex + 1} of ${QUESTIONS.length}`;
  $("qStars").textContent = `⭐ ${stars}`;
  $("qProgress").style.width = (qIndex / QUESTIONS.length) * 100 + "%";
  $("qEmoji").textContent = item.emoji;
  setRich($("qText"), item.q);
  $("qFeedback").textContent = "";
  $("hintText").textContent = "";
  $("hintBtn").hidden = !item.hint;
  $("nextBtn").hidden = true;

  const box = $("qOptions");
  box.innerHTML = "";
  live.options.forEach((o, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option";
    b.innerHTML = '<span class="o-emoji" aria-hidden="true"></span><span class="o-word"></span>';
    b.querySelector(".o-emoji").textContent = o.emoji;
    b.querySelector(".o-word").textContent = o.word;
    b.setAttribute("aria-label", o.word);
    b.addEventListener("click", () => answer(i));
    box.appendChild(b);
  });

  const body = $("qBody");
  body.classList.remove("swap"); void body.offsetWidth; body.classList.add("swap");
  startTimer();
  if (CONFIG.sound.autoRead) setTimeout(readQuestion, REDUCED ? 0 : 400);
}

$("readBtn").addEventListener("click", readQuestion);

$("hintBtn").addEventListener("click", () => {
  const item = QUESTIONS[qIndex];
  if (!item.hint || live.answered) return;
  $("hintText").textContent = "💡 " + fill(item.hint);
  $("hintBtn").hidden = true;
  speak(plain(item.hint));
});

/** i = tapped picture, or -1 when the timer ran out. */
function answer(i) {
  if (!live || live.answered) return;
  live.answered = true;
  stopTimer();
  const item = QUESTIONS[qIndex];
  const ok = i === live.correct;
  if (ok) stars++;
  picked[qIndex] = i < 0 ? "⏰" : live.options[i].word + (ok ? " ✅" : "");

  [...$("qOptions").children].forEach((b, j) => {
    b.disabled = true;
    if (j === live.correct) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
    else b.classList.add("dim");
  });
  $("hintBtn").hidden = true;

  const line = (i < 0 ? TIMEOUT_LINE : "") + fill(ok ? item.right : item.wrong);
  $("qFeedback").textContent = line;
  $("qStars").textContent = `⭐ ${stars}`;
  $("qProgress").style.width = ((qIndex + 1) / QUESTIONS.length) * 100 + "%";
  ding(ok);
  speak(line);
  if (ok) smallBurst();

  const last = qIndex === QUESTIONS.length - 1;
  $("nextBtn").textContent = last ? "See my stars ⭐" : "Next ➡️";
  $("nextBtn").hidden = false;
  $("nextBtn").focus({ preventScroll: true });
}

$("nextBtn").addEventListener("click", () => {
  stopSpeaking();
  qIndex++;
  if (qIndex < QUESTIONS.length) return renderQuestion();
  showReward();
});

/* ==========================================================
   3. REWARD
   ========================================================== */
function showReward() {
  const total = QUESTIONS.length;
  const badge = CONFIG.badges.find((b) => stars >= b.min) || CONFIG.badges[CONFIG.badges.length - 1];
  $("sticker").textContent = badge.sticker;
  $("rewardTitle").textContent = fill(badge.title);
  $("rewardStars").textContent = "⭐".repeat(stars) + "☆".repeat(total - stars);
  $("rewardStars").setAttribute("aria-label", `${stars} out of ${total} stars`);
  $("rewardMsg").textContent = `${stars} out of ${total} stars! ` + fill(badge.msg);
  $("signoff").textContent = fill(CONFIG.signoff);

  if (CONFIG.whatsapp.number) {
    const text = fill(CONFIG.whatsapp.text, { stars, total }) + "\n" + picked.map((p, n) => `${n + 1}. ${p}`).join("\n");
    const wa = $("waBtn");
    wa.textContent = fill(CONFIG.whatsapp.buttonText);
    wa.href = `https://wa.me/${CONFIG.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
    wa.hidden = false;
  }

  showScreen($("playScreen"), $("rewardScreen"));
  setTimeout(() => { confettiBurst(); ding(true); speak(fill(badge.title) + " " + stars + " stars!"); }, REDUCED ? 0 : 350);
}

$("againBtn").addEventListener("click", () => {
  stopSpeaking();
  startGame();
  showScreen($("rewardScreen"), $("playScreen"));
});
$("confettiBtn").addEventListener("click", confettiBurst);

/* ==========================================================
   Confetti (stars + paper bits): plain canvas, no libraries
   ========================================================== */
const canvas = $("confetti");
const ctx = canvas.getContext("2d");
let pieces = [], raf = null;

function sizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener("resize", sizeCanvas);
sizeCanvas();

const COLORS = ["#111111", "#555555", "#999999", "#ffd23f", "#ff6b6b", "#4dabf7", "#51cf66"];
function addPiece(x, y, vx, vy) {
  pieces.push({ x, y, vx, vy, w: 6 + Math.random() * 7, h: 8 + Math.random() * 10, rot: Math.random() * Math.PI,
    vr: REDUCED ? 0 : (Math.random() - 0.5) * 0.3, color: COLORS[(Math.random() * COLORS.length) | 0], star: Math.random() < 0.3, life: 0 });
}
function confettiBurst() {
  const n = REDUCED ? 40 : innerWidth < 600 ? 150 : 240;
  for (let i = 0; i < n; i++) {
    const L = i % 2 === 0;
    if (REDUCED) addPiece(Math.random() * innerWidth, -20 - Math.random() * innerHeight * 0.5, 0, 2 + Math.random() * 2);
    else addPiece(L ? -10 : innerWidth + 10, innerHeight * (0.55 + Math.random() * 0.3), (L ? 1 : -1) * (4 + Math.random() * 8), -(9 + Math.random() * 10));
  }
  if (!raf) raf = requestAnimationFrame(draw);
}
function smallBurst() {
  const n = REDUCED ? 0 : innerWidth < 600 ? 30 : 45;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6, sp = 7 + Math.random() * 7;
    addPiece(innerWidth / 2, innerHeight * 0.6, Math.cos(a) * sp, Math.sin(a) * sp);
  }
  if (n && !raf) raf = requestAnimationFrame(draw);
}
function drawStar(r) {
  ctx.beginPath();
  for (let k = 0; k < 10; k++) {
    const rr = k % 2 ? r * 0.45 : r, a = (k * Math.PI) / 5 - Math.PI / 2;
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath(); ctx.fill();
}
function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pieces = pieces.filter((p) => p.y < innerHeight + 40 && p.life < 600);
  for (const p of pieces) {
    p.life++; p.vy += REDUCED ? 0 : 0.25; p.vx *= 0.985; p.x += p.vx; p.y += Math.min(p.vy, 7); p.rot += p.vr;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
    if (p.star) drawStar(p.w * 0.9);
    else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.life / 8)) + 2);
    ctx.restore();
  }
  raf = pieces.length ? requestAnimationFrame(draw) : null;
  if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
}
