const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");
const card = document.getElementById("card");
const floatLayer = document.getElementById("floatLayer");

const FINAL_AT = 4; // after 4 clicks, No starts dodging

const noTexts = [
  "No 🙃",
  "hmm… are you sure? 🥺",
  "Lam is pouting 💗",
  "okay… last normal “no” 😈",
  "too late 😭💞"
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
setInterval(() => popHeart(Math.random() * innerWidth, innerHeight + 30), 420);

function growYes() {
  const scale = 1 + Math.min(noCount, 10) * 0.085;
  yesBtn.style.transform = `scale(${scale})`;
}

function finalStage() {
  return noCount >= FINAL_AT;
}

// Only used at the end
function dodgeInsideCard() {
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  noBtn.style.position = "absolute";

  const pad = 18;
  const maxX = cardRect.width - btnRect.width - pad;
  const maxY = cardRect.height - btnRect.height - pad;

  const x = pad + Math.random() * Math.max(1, maxX - pad);
  const y = pad + Math.random() * Math.max(1, maxY - pad);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// YES redirect (keeps it a real button)
yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

noBtn.addEventListener("click", (e) => {
  // cute burst on click
  for (let i = 0; i < 6; i++) {
    popHeart(
      e.clientX + (Math.random() * 80 - 40),
      e.clientY + (Math.random() * 60 - 30)
    );
  }

  // At final stage: it dodges (only now)
  if (finalStage()) {
    hint.textContent = "okay now it runs away 😈💞";
    growYes();
    dodgeInsideCard();
    noBtn.textContent = noTexts[noTexts.length - 1];
    return;
  }

  // Normal stage: NO MOVEMENT
  noCount++;
  noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];
  growYes();

  hint.textContent =
    noCount === 1 ? "I’m literally a sweetheart 🥺" :
    noCount === 2 ? "don’t do Lam like that 😭💗" :
    noCount === 3 ? "one more and it gets chaotic 😈" :
    "";
});

// Extra: in final stage, it dodges when they try to hover it
noBtn.addEventListener("mouseenter", () => {
  if (finalStage()) dodgeInsideCard();
});
