const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");
const sheet = document.getElementById("sheet");
const floatLayer = document.getElementById("floatLayer");

// “No” messages: unique + not too spammy
const noTexts = [
  "No 🙃",
  "hmm… are you sure? 🥺",
  "Lam is pouting 💗",
  "okay… this is getting serious 😭",
  "last “no” before it runs away 😈"
];

let noCount = 0;

function popHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "float";
  heart.textContent = ["💗","💖","💘","💕","💞","✨"][Math.floor(Math.random() * 6)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${16 + Math.random() * 18}px`;

  const duration = 2600 + Math.random() * 1200;
  heart.style.animationDuration = `${duration}ms`;

  floatLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration + 50);
}

// ambient hearts
setInterval(() => {
  popHeart(Math.random() * window.innerWidth, window.innerHeight + 30);
}, 420);

function growYes() {
  const scale = 1 + Math.min(noCount, 10) * 0.08;
  yesBtn.style.transform = `scale(${scale})`;
}

// Only used in FINAL stage
function dodgeInsideSheet() {
  const sheetRect = sheet.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  noBtn.style.position = "absolute";

  const pad = 16;
  const maxX = sheetRect.width - btnRect.width - pad;
  const maxY = sheetRect.height - btnRect.height - pad;

  const x = pad + Math.random() * Math.max(1, maxX - pad);
  const y = pad + Math.random() * Math.max(1, maxY - pad);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// FINAL stage trigger: after 4 “no” clicks
function isFinalStage() {
  return noCount >= 4;
}

noBtn.addEventListener("click", (e) => {
  // hearts burst on click (cute feedback)
  for (let i = 0; i < 6; i++) {
    popHeart(
      e.clientX + (Math.random() * 80 - 40),
      e.clientY + (Math.random() * 60 - 30)
    );
  }

  // If final stage: it RUNS AWAY only now
  if (isFinalStage()) {
    hint.textContent = "oops… too late 😈💞";
    growYes();
    dodgeInsideSheet();
    return;
  }

  // Normal stage: no movement, just soft progression
  noCount++;
  noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];
  growYes();

  hint.textContent =
    noCount === 1 ? "I’m literally a sweetheart 🥺" :
    noCount === 2 ? "don’t do Lam like that 😭💗" :
    noCount === 3 ? "okay… you’re making Yes stronger 😈" :
    "";
});
