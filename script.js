const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");
const card = document.getElementById("card");
const floatLayer = document.getElementById("floatLayer");

const noTexts = [
  "No 🙃",
  "wait… no? 🥺",
  "are you sure?? 💔",
  "Lam is gonna cry 😭",
  "pls say yes 💗",
  "okay last chance 😳",
  "NO button is shy now 😈",
  "you can’t catch me 💞"
];

let noCount = 0;

// Smoothly teleport inside card boundaries
function dodge() {
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  noBtn.style.position = "absolute";

  const pad = 18;
  const maxX = cardRect.width - btnRect.width - pad;
  const maxY = cardRect.height - btnRect.height - pad;

  const x = pad + Math.random() * Math.max(1, maxX - pad);
  const y = pad + Math.random() * Math.max(1, maxY - pad);

  noBtn.animate(
    [
      { transform: "translate(0,0) scale(1)" },
      { transform: "translate(0,0) scale(1.04)" },
      { transform: "translate(0,0) scale(1)" }
    ],
    { duration: 220, easing: "ease-out" }
  );

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function growYes() {
  const scale = 1 + Math.min(noCount, 10) * 0.085;
  yesBtn.style.transform = `scale(${scale})`;
}

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

// background floating hearts (ambient)
setInterval(() => {
  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight + 30;
  popHeart(x, y);
}, 420);

// when hovering / clicking no
noBtn.addEventListener("mouseenter", () => {
  if (noCount >= 1) dodge();
});

noBtn.addEventListener("click", (e) => {
  noCount++;
  noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];

  hint.textContent =
    noCount <= 2 ? "hmm… that’s not very sweet 😭💗" :
    noCount <= 5 ? "the No button is slippery now 😈" :
    "okay okay… just press YES 💞";

  growYes();
  dodge();

  // burst hearts around click
  for (let i = 0; i < 6; i++) {
    popHeart(e.clientX + (Math.random() * 80 - 40), e.clientY + (Math.random() * 60 - 30));
  }
});
