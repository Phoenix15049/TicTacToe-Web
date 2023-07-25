const buttons = ["green", "red", "yellow", "blue"];
const sequence = [];
let playerTurn = false;
let level = 1;
let strictMode = false;

const message = document.getElementById("message");
const levelDisplay = document.getElementById("level");

function generateSequence() {
  for (let i = 0; i < level; i++) {
    sequence.push(buttons[Math.floor(Math.random() * 4)]);
  }
}

function playSequence() {
  playerTurn = false;
  let i = 0;
  const interval = setInterval(() => {
    highlightButton(sequence[i]);
    i++;
    if (i === sequence.length) {
      clearInterval(interval);
      playerTurn = true;
      message.textContent = "Your Turn";
    }
  }, 1000);
}

function highlightButton(color) {
  const button = document.querySelector(`.${color}`);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 500);
}

function pressButton(color) {
  if (!playerTurn) return;

  if (color === sequence[0]) {
    sequence.shift();
    if (sequence.length === 0) {
      level++;
      message.textContent = "Correct! Next Level";
      levelDisplay.textContent = `Level: ${level}`;
      setTimeout(() => {
        playSequence();
      }, 1000);
    }
  } else {
    message.textContent = "Wrong! Try Again";
    if (strictMode) {
      sequence.length = 0;
      level = 1;
      levelDisplay.textContent = `Level: ${level}`;
    }
    setTimeout(() => {
      playSequence();
    }, 1000);
  }
}

function startGame() {
  sequence.length = 0;
  level = 1;
  levelDisplay.textContent = `Level: ${level}`;
  generateSequence();
  playSequence();
}

function toggleStrictMode() {
  strictMode = !strictMode;
  if (strictMode) {
    message.textContent = "Strict Mode: On";
  } else {
    message.textContent = "Strict Mode: Off";
  }
}

function resetGame() {
  sequence.length = 0;
  level = 1;
  levelDisplay.textContent = `Level: ${level}`;
  message.textContent = "";
  playerTurn = false;
}

startGame();
