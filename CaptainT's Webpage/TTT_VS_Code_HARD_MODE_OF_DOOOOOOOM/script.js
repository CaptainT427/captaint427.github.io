const boardSize = 20;
const winLength = 6;
const boardElement = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let board = Array(boardSize * boardSize).fill(null);
let currentPlayer = 'X';

function createBoard() {
  boardElement.innerHTML = '';
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;
  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    boardElement.appendChild(cell);
  }
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const index = parseInt(e.target.dataset.index);
  if (!board[index]) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winPattern = checkWin(index);
    if (winPattern) {
      winPattern.forEach(i => boardElement.children[i].classList.add('win'));
      status.textContent = `${currentPlayer} wins!`;
      disableBoard();
    } else if (board.every(cell => cell)) {
      status.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function disableBoard() {
  for (let cell of boardElement.children) {
    cell.style.pointerEvents = 'none';
  }
}

function checkWin(index) {
  const directions = [1, boardSize, boardSize + 1, boardSize - 1];
  for (let dir of directions) {
    let line = [index];
    let i = index;
    while (line.length < winLength) {
      i += dir;
      if (isValid(i, line[line.length - 1]) && board[i] === currentPlayer) {
        line.push(i);
      } else break;
    }
    i = index;
    while (line.length < winLength) {
      i -= dir;
      if (isValid(i, line[0]) && board[i] === currentPlayer) {
        line.unshift(i);
      } else break;
    }
    if (line.length >= winLength) return line;
  }
  return null;
}

function isValid(i, ref) {
  return i >= 0 && i < board.length &&
    Math.abs((i % boardSize) - (ref % boardSize)) <= 1;
}

resetBtn.addEventListener('click', () => {
  board = Array(boardSize * boardSize).fill(null);
  currentPlayer = 'X';
  createBoard();
});

createBoard();