"use strict";
// Elements
let message = document.querySelector(".message");
let number = document.querySelector(".number");
let chances = document.querySelector(".chances");
const modal = document.querySelector(".modal");
const btnShowModal = document.querySelector(".show-modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// Variables
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let checkWin = false;
let highscore = 0;
let chancesLeft = 6;

const check = function () {
  if (checkWin == false) {
    const guess = Number(document.querySelector(".guess").value);
    // When player does not enter a correct number.
    if (guess <= 0 || guess > 20) {
      message.textContent = "Enter a correct number! (Between 1-20)";
    }
    // When player enters the correct number.
    else if (guess === secretNumber) {
      // If chances is not bigger than one and player did beat the game, then do nothing. (basically stop functioning)
      if (chancesLeft > 1) {
        number.textContent = secretNumber;
        checkWin = true;
        message.textContent = "Congrats you guessed the number!";
        document.querySelector("body").style.backgroundColor = "#60b347";
        number.style.width = "30rem";
        if (chancesLeft > highscore) {
          highscore = chances.textContent;
          document.querySelector(".highscore").textContent = highscore;
        }
      }
    }
    // When player enters a bigger number than the secret number.
    else if (guess != secretNumber) {
      if (secretNumber < guess) {
        message.textContent = "🔼 Number too high. Try again!";
      } else {
        message.textContent = "🔽 Number too low. Try again!";
      }
      chancesLeft--;
      chances.textContent = chancesLeft;
      // If chances is not sufficient program stops working.
      if (chancesLeft < 1) lostGame();
    }
  }
};
const again = function () {
  checkWin = false;
  chancesLeft = 6;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  chances.textContent = chancesLeft;
  number.textContent = "?";
  number.style.width = "15rem";
  message.textContent = "Start guessing..";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".guess").value = "";
};

const lostGame = function () {
  message.textContent = "You lost the game! The number was " + secretNumber;
  chances.textContent = 0;
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.querySelector(".check").addEventListener("click", check);
document.querySelector(".again").addEventListener("click", again);
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    check();
  }
  if (e.key === "a" || e.key === "A") {
    again();
  }
  if (e.key === "h" || e.key === "H") {
    openModal();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
