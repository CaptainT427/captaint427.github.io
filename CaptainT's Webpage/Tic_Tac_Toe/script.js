const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const playerSelect = document.getElementById('player-select');
const resetBtn = document.getElementById('reset');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameStarted = false;
let scores = { X: 0, O: 0 };

function startGame(player) {
    currentPlayer = player;
    playerSelect.style.display = 'none';
    status.textContent = `Player ${currentPlayer}'s turn`;
    gameStarted = true;
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
        cell.style.pointerEvents = 'auto';
    });
}

resetBtn.addEventListener('click', () => {
    if (!gameStarted) return;
    board = Array(9).fill(null);
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
        cell.style.pointerEvents = 'auto';
    });
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameStarted) return;

        const index = cell.dataset.index;
        if (!board[index]) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            const winPattern = checkWin();
            if (winPattern) {
                status.textContent = `${currentPlayer} wins!`;
                winPattern.forEach(i => cells[i].classList.add('win'));
                scores[currentPlayer]++;
                updateScore();
                cells.forEach(c => c.style.pointerEvents = 'none');
            } else if (board.every(cell => cell)) {
                status.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for (let pattern of winPatterns) {
        if (pattern.every(index => board[index] === currentPlayer)) {
            return pattern;
        }
    }
    return null;
}

function updateScore() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}
const themeToggle = document.getElementById('toggle-theme');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
