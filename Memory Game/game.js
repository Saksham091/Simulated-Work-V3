const cardsContainer = document.querySelector(".cards");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");

let maxTime = 40;
let timeLeft = maxTime;
let matchedCard = 0;
let flips = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

const cardImages = [
  { name: "monster1", src: "./assets/img-1.png" },
  { name: "monster2", src: "./assets/img-2.png" },
  { name: "monster3", src: "./assets/img-3.png" },
  { name: "monster4", src: "./assets/img-4.png" },
  { name: "monster5", src: "./assets/img-5.png" },
  { name: "monster6", src: "./assets/img-6.png" },
  { name: "monster7", src: "./assets/img-7.png" },
  { name: "monster8", src: "./assets/img-8.png" },
];

function initTimer() {
  if (timeLeft <= 0) {
    return clearInterval(timer);
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
  if (timeLeft == 0) {
    location.href = "result.html";
  }
}

function createCardElement(card) {
  const li = document.createElement("li");
  li.classList.add("card");
  li.setAttribute("data-name", card.name);

  const frontView = document.createElement("div");
  frontView.classList.add("view", "front-view");
  frontView.innerHTML = `<span>?</span>`;

  const backView = document.createElement("div");
  backView.classList.add("view", "back-view");
  const img = document.createElement("img");
  img.setAttribute("src", card.src);
  img.setAttribute("alt", `${card.name}`);
  backView.appendChild(img);

  li.appendChild(frontView);
  li.appendChild(backView);
  return li;
}

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft;
  flipsTag.innerText = flips;
  disableDeck = isPlaying = false;

  const shuffledCards = [...cardImages, ...cardImages].sort(
    () => Math.random() - 0.5
  );

  cardsContainer.innerHTML = ""; // Clear previous cards
  shuffledCards.forEach((card) => {
    const cardElement = createCardElement(card);
    cardsContainer.appendChild(cardElement);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function flipCard({ target }) {
  const clickedCard = target.closest(".card");
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    const cardOneName = cardOne.getAttribute("data-name");
    const cardTwoName = cardTwo.getAttribute("data-name");

    matchCards(cardOneName, cardTwoName);
  }
}

function matchCards(name1, name2) {
  if (name1 === name2) {
    matchedCard++;
    let score = (12.5 * matchedCard).toFixed(2);
    sessionStorage.setItem("score", score);

    if (matchedCard == 8 && timeLeft > 0) {
      location.href = "result.html";
      return clearInterval(timer);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

refreshBtn.addEventListener("click", shuffleCard);

// Initialize game
shuffleCard();
