const canvas = document.getElementById("tetrisCanvas");
const context = canvas.getContext("2d");

const ROWS = 20;
const COLUMNS = 10;
const BLOCK_SIZE = 30;
const COLORS = ["#000", "#f00", "#0f0", "#00f", "#f80", "#f0f", "#0ff", "#ff0"];

let board = createBoard();
let currentPiece = generateRandomPiece();
let gameOver = false;
let speed = 4;
const keys = {};
let score = 0;

function createBoard() {
    return Array.from({length: ROWS}, () => Array(COLUMNS).fill(0));
}

function drawBlock(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    context.strokeStyle = "#fff";
    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const colorIndex = board[row][col];
            drawBlock(col, row, COLORS[colorIndex]);
        }
    }
}

function drawPiece() {
    currentPiece.shape.forEach((row, i) => {
        row.forEach((block, j) => {
            if (block !== 0) {
                drawBlock(currentPiece.x + j, currentPiece.y + i, COLORS[currentPiece.color]);
            }
        });
    });
}

function movePieceDown() {
    currentPiece.y += 1;
    if (isCollision()) {
        currentPiece.y--;
        mergePiece();
        checkForCompletedRows()
        currentPiece = generateRandomPiece();
        if (isCollision()) {
            gameOver = true;
        }
    }
}

function movePieceLeft() {
    currentPiece.x -= 1;
    if (isCollision()) {
        currentPiece.x++;
    }
}

function movePieceRight() {
    currentPiece.x += 1;
    if (isCollision()) {
        currentPiece.x--;
    }
}

function rotatePiece() {
    const originalShape = currentPiece.shape;
    currentPiece.shape = currentPiece.shape[0].map((_, i) => currentPiece.shape.map(row => row[i])).reverse();
    if (isCollision()) {
        currentPiece.shape = originalShape;
    }
}

function isCollision() {
    for (let i = 0; i < currentPiece.shape.length; i++) {
        for (let j = 0; j < currentPiece.shape[i].length; j++) {
            if (
                currentPiece.shape[i][j] !== 0 &&
                (board[currentPiece.y + i] && board[currentPiece.y + i][currentPiece.x + j]) !== 0
            ) {
                return true;
            }
        }
    }
    return false;
}

function mergePiece() {
    currentPiece.shape.forEach((row, i) => {
        row.forEach((block, j) => {
            if (block !== 0) {
                board[currentPiece.y + i][currentPiece.x + j] = currentPiece.color;
            }
        });
    });
}

function checkForCompletedRows() {
    let completedRows = [];
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(block => block !== 0)) {
            completedRows.push(row);
        }
    }
    if (completedRows.length > 0) {
        // Ajouter 101 points pour chaque ligne cassée
        score += 101;

        // Vérifier si le score atteint 404
        if (score > 404) {
            gameOver = true;
            score = 404;
        }

        completedRows.forEach(row => {
            board.splice(row, 1);
            board.unshift(Array(COLUMNS).fill(0));
        });
    }
}


function generateRandomPiece() {
    const pieces = [
        {shape: [[1, 1, 1, 1]], color: 1},
        {shape: [[1, 1], [1, 1]], color: 2},
        {shape: [[1, 1, 1], [0, 1, 0]], color: 3},
        {shape: [[1, 1, 1], [1, 0, 0]], color: 4},
        {shape: [[1, 1, 1], [0, 0, 1]], color: 5},
        {shape: [[1, 1, 0], [0, 1, 1]], color: 6},
        {shape: [[0, 1, 1], [1, 1, 0]], color: 7}
    ];

    const randomIndex = Math.floor(Math.random() * pieces.length);
    const piece = pieces[randomIndex];

    return {
        shape: piece.shape,
        color: piece.color,
        x: Math.floor((COLUMNS - piece.shape[0].length) / 2),
        y: 0
    };
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();

    // Affiche le score
    context.fillStyle = "#fff";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 20, 30);

    if (!gameOver) {
        movePieceDown();

        if (score >= 404) {
            gameOver = true;
            score = 404;
        }
    }

    if (gameOver) {
        context.fillStyle = "#fff";
        context.font = "30px Arial";
        if (score === 404) {
            document.getElementById("congratulations-message").style.display = "block";
            document.getElementById("finalScoreWin").innerText = score;
        } else {
            document.getElementById("game-over-message").style.display = "block";
            document.getElementById("finalScoreLose").innerText = score;
        }
        return;
    }
}

function handleKeyDown(event) {
    keys[event.key] = true;

    if (!gameOver) {
        switch (event.key) {
            case "ArrowLeft":
                movePieceLeft();
                break;
            case "ArrowRight":
                movePieceRight();
                break;
            case "ArrowUp":
                event.preventDefault();
                rotatePiece();
                break;
            case "ArrowDown":
                event.preventDefault();
                movePieceDown();
                break;
        }
    }
}

function handleKeyUp(event) {
    keys[event.key] = false;
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleContinuousKeypress() {
    if (keys["ArrowLeft"]) {
        movePieceLeft();
    }
    if (keys["ArrowRight"]) {
        movePieceRight();
    }
    if (keys["ArrowDown"]) {
        movePieceDown();
    }
    if (keys["ArrowUp"]) {
        rotatePiece();
    }
    draw();
}

handleContinuousKeypress()

const intervalId = setInterval( () => {
    draw();
    if (gameOver) {
        clearInterval(intervalId);
    }
}, 1000 / speed);
