const board = document.getElementById("board");
const status = document.getElementById("game-status");
let cells = Array(9).fill(null);
let isGameOver = false;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value;
    cell.onclick = () => handleClick(index);
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (cells[index] || isGameOver) return;

  cells[index] = "X";
  renderBoard();

  if (checkWin("X")) {
    status.textContent = "You Win!";
    isGameOver = true;
    return;
  }

  if (cells.every(cell => cell)) {
    status.textContent = "Draw!";
    isGameOver = true;
    return;
  }

  status.textContent = "Computer's Turn";
  setTimeout(computerMove, 500);
}

function computerMove() {
  const emptyIndices = cells.map((val, idx) => val ? null : idx).filter(v => v !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[randomIndex] = "O";
  renderBoard();

  if (checkWin("O")) {
    status.textContent = "Computer Wins!";
    isGameOver = true;
  } else if (cells.every(cell => cell)) {
    status.textContent = "Draw!";
    isGameOver = true;
  } else {
    status.textContent = "Your Turn";
  }
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => 
    pattern.every(index => cells[index] === player)
  );
}

function resetGame() {
  cells = Array(9).fill(null);
  isGameOver = false;
  status.textContent = "Your Turn";
  renderBoard();
}

renderBoard();
