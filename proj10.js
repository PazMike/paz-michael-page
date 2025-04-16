// Arrays to store the correct order and current draggable elements
let correctOrder = [];
let currentPieces = [];

// Timer variables
let timer = 0;
let interval;

// When the page is loaded, set up the puzzle board and start the timer
window.onload = function () {
  setupBoard();
  startTimer();
};

function setupBoard() {
  const board = document.getElementById("puzzle-board");
  board.innerHTML = ""; // Clear any existing pieces
  correctOrder = [];
  currentPieces = [];

  // Fill correctOrder with numbers 0–8 (for 9 puzzle pieces)
  for (let i = 0; i < 9; i++) {
    correctOrder.push(i);
  }

  // Create a shuffled version of the puzzle piece indices
  let shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

  // Create and configure each puzzle piece
  shuffled.forEach((num) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.setAttribute("draggable", "true");
    piece.dataset.index = num;

    // Set correct background position for puzzle image based on piece index
    piece.style.backgroundPosition = `-${(num % 3) * 100}px -${
      Math.floor(num / 3) * 100
    }px`;

    // Add drag event listeners
    piece.addEventListener("dragstart", dragStart);
    piece.addEventListener("dragover", dragOver);
    piece.addEventListener("drop", dropPiece);
    piece.addEventListener("dragenter", dragEnter);
    piece.addEventListener("dragleave", dragLeave);

    // Append to the puzzle board and track it
    board.appendChild(piece);
    currentPieces.push(piece);
  });

  // Clear previous messages and reset timer display
  document.getElementById("message").innerText = "";
  timer = 0;
  updateTimerDisplay();
}

function startTimer() {
  // Clear any existing interval and start a new one
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  // Update the timer UI
  document.getElementById("timer").innerText = `Time: ${timer}s`;
}

let dragged; // Stores the currently dragged element

function dragStart(e) {
  dragged = e.target;
  dragged.classList.add("dragging");
}

function dragOver(e) {
  e.preventDefault(); // Allows drop
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

  if (e.target === dragged) return; // Don't allow dropping on self

  e.target.classList.remove("hovered");
  dragged.classList.remove("dragging");

  const board = document.getElementById("puzzle-board");
  let fromIndex = Array.from(board.children).indexOf(dragged);
  let toIndex = Array.from(board.children).indexOf(e.target);

  // Swap the positions of the two puzzle pieces
  if (fromIndex > -1 && toIndex > -1) {
    board.insertBefore(dragged, board.children[toIndex]);
    board.insertBefore(e.target, board.children[fromIndex]);
  }

  // Check if the puzzle is solved
  checkPuzzle();
}

function checkPuzzle() {
  const board = document.getElementById("puzzle-board");
  const pieces = Array.from(board.children);
  let isSolved = true;

  // Loop through each piece to check if it's in the correct position
  pieces.forEach((piece, index) => {
    if (parseInt(piece.dataset.index) !== index) {
      isSolved = false;
    } else {
      piece.classList.add("snapped"); // Optional visual feedback
    }
  });

  // Show completion message if puzzle is solved
  if (isSolved) {
    clearInterval(interval);
    document.getElementById("message").innerText = `🎉 Puzzle Completed in ${timer}s!`;
  } else {
    // Remove "snapped" style if not in correct position
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
  // Resets the board and restarts the timer
  clearInterval(interval);
  setupBoard();
  startTimer();
}
