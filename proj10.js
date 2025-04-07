let correctOrder = [];
let currentPieces = [];
let timer = 0;
let interval;

window.onload = function () {
  setupBoard();
  startTimer();
};

function setupBoard() {
  const board = document.getElementById("puzzle-board");
  board.innerHTML = "";
  correctOrder = [];
  currentPieces = [];

  for (let i = 0; i < 9; i++) {
    correctOrder.push(i);
  }

  let shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

  shuffled.forEach((num, index) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.setAttribute("draggable", "true");
    piece.dataset.index = num;
    piece.style.backgroundPosition = `-${(num % 3) * 100}px -${
      Math.floor(num / 3) * 100
    }px`;

    piece.addEventListener("dragstart", dragStart);
    piece.addEventListener("dragover", dragOver);
    piece.addEventListener("drop", dropPiece);
    piece.addEventListener("dragenter", dragEnter);
    piece.addEventListener("dragleave", dragLeave);

    board.appendChild(piece);
    currentPieces.push(piece);
  });

  document.getElementById("message").innerText = "";
  timer = 0;
  updateTimerDisplay();
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById("timer").innerText = `Time: ${timer}s`;
}

let dragged;

function dragStart(e) {
  dragged = e.target;
  dragged.classList.add("dragging");
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  if (e.target.classList.contains("piece")) {
    e.target.classList.add("hovered");
  }
}

function dragLeave(e) {
  if (e.target.classList.contains("piece")) {
    e.target.classList.remove("hovered");
  }
}

function dropPiece(e) {
  e.preventDefault();
  if (e.target === dragged) return;
  e.target.classList.remove("hovered");
  dragged.classList.remove("dragging");

  const board = document.getElementById("puzzle-board");
  let fromIndex = Array.from(board.children).indexOf(dragged);
  let toIndex = Array.from(board.children).indexOf(e.target);

  if (fromIndex > -1 && toIndex > -1) {
    board.insertBefore(dragged, board.children[toIndex]);
    board.insertBefore(e.target, board.children[fromIndex]);
  }

  checkPuzzle();
}

function checkPuzzle() {
  const board = document.getElementById("puzzle-board");
  const pieces = Array.from(board.children);
  let isSolved = true;

  pieces.forEach((piece, index) => {
    if (parseInt(piece.dataset.index) !== index) {
      isSolved = false;
    } else {
      piece.classList.add("snapped");
    }
  });

  if (isSolved) {
    clearInterval(interval);
    document.getElementById(
      "message"
    ).innerText = `🎉 Puzzle Completed in ${timer}s!`;
  } else {
    pieces.forEach((piece) => {
      if (
        parseInt(piece.dataset.index) !==
        Array.from(board.children).indexOf(piece)
      ) {
        piece.classList.remove("snapped");
      }
    });
  }
}

function resetGame() {
  clearInterval(interval);
  setupBoard();
  startTimer();
}
