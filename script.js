const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");
const card = document.querySelector(".card");

const messages = [
  "No 🙃",
  "are you sure? 🥺",
  "Lam is sad… 💔",
  "pls pls pls 💗",
  "okay but… I’m cute 😭",
  "don’t do this to me 😔",
  "last chance!! 💘",
  "you’re making the Yes button stronger 😈💞"
];

let clicks = 0;

function dodge() {
  // make the No button teleport inside the card
  noBtn.style.position = "absolute";

  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const pad = 18;
  const maxX = cardRect.width - btnRect.width - pad;
  const maxY = cardRect.height - btnRect.height - pad;

  const x = pad + Math.random() * Math.max(1, maxX - pad);
  const y = pad + Math.random() * Math.max(1, maxY - pad);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function growYes() {
  const scale = 1 + Math.min(clicks, 10) * 0.09;
  yesBtn.style.transform = `scale(${scale})`;
}

function sparkleHearts() {
  const heart = document.createElement("div");
  heart.textContent = ["💗","💖","💘","💕","💞"][Math.floor(Math.random()*5)];
  heart.style.position = "absolute";
  heart.style.left = `${50 + (Math.random()*120 - 60)}%`;
  heart.style.top = `${40 + (Math.random()*60 - 30)}%`;
  heart.style.fontSize = `${18 + Math.random()*18}px`;
  heart.style.opacity = "0.95";
  heart.style.transform = "translate(-50%, -50%)";
  heart.style.pointerEvents = "none";
  heart.style.filter = "drop-shadow(0 10px 14px rgba(0,0,0,.15))";

  card.appendChild(heart);

  const driftX = (Math.random() * 80 - 40);
  const driftY = (Math.random() * -120 - 60);

  heart.animate(
    [
      { transform: "translate(-50%, -50%)", opacity: 0.95 },
      { transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px))`, opacity: 0 }
    ],
    { duration: 900, easing: "ease-out" }
  );

  setTimeout(() => heart.remove(), 950);
}

noBtn.addEventListener("mouseenter", () => {
  if (clicks >= 1) dodge();
});

noBtn.addEventListener("click", () => {
  clicks++;
  noBtn.textContent = messages[Math.min(clicks, messages.length - 1)];
  hint.textContent = clicks < 3
    ? "hmm… that’s not very sweetheart of you 💞"
    : "the No button is shy now 😭💗";

  sparkleHearts();
  growYes();
  dodge();
});
