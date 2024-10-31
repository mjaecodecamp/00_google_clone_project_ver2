const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'close';
let board = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 게임 초기화
function initializeGame() {
    board.fill(null);
    gameActive = true;
    currentPlayer = 'close';
    cells.forEach(cell => cell.classList.remove('close', 'circle'));
}

// 플레이어 이동 처리
function processPlayerMove(event) {
    const index = event.target.dataset.index;

    if (!gameActive || board[index]) return;

    updateBoard(index, event.target);
    if (checkWin()) {
        endGame(`${getPlayerSymbol()} 가 이겼습니다.`);
    } else if (isDraw()) {
        endGame('무승부입니다.');
    } else {
        switchPlayer();
    }
}

// 보드 업데이트
function updateBoard(index, cell) {
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer);
}

// 승리 조건 체크
function checkWin() {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}

// 무승부 체크
function isDraw() {
    return board.every(cell => cell !== null);
}

// 게임 종료
function endGame(message) {
    gameActive = false;
    setTimeout(() => alert(message), 100);
}

// 현재 플레이어 전환
function switchPlayer() {
    currentPlayer = currentPlayer === 'close' ? 'circle' : 'close';
}

// 현재 플레이어 심볼 반환
function getPlayerSymbol() {
    return currentPlayer === 'close' ? 'X' : 'O';
}

// 이벤트 리스너 등록
cells.forEach(cell => cell.addEventListener('click', processPlayerMove));
resetButton.addEventListener('click', initializeGame);

// 초기 게임 설정 호출
initializeGame();
