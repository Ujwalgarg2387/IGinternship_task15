const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const restartButton = document.getElementById('restartButton');
const gameOverSound = document.getElementById('gameOverSound');
const ballTouchSound = document.getElementById('ballTouchSound');

canvas.height = 400;
canvas.width = 400;

const boxSize = 30;
const ballSize = 10;
const speed = 5;

let boxX = canvas.width / 2 - boxSize / 2;
let boxY = canvas.height / 2 - boxSize / 2;

let ballX = getRandomPosition(canvas.width - ballSize);
let ballY = getRandomPosition(canvas.height - ballSize);

let score = 0;
let gameOver = false;

function getRandomPosition(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

function createBox() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(boxX,boxY,boxSize,boxSize);
}

function createBall() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

function displayScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function startGame() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if(!gameOver) {
        createBox();
        createBall();
        displayScore();
        if (
            boxX < ballX + ballSize &&
            boxX + boxSize > ballX &&
            boxY < ballY + ballSize &&
            boxY + boxSize > ballY
          ) {
            ballX = getRandomPosition(canvas.width - ballSize);
            ballY = getRandomPosition(canvas.height - ballSize);
            score++;
            ballTouchSound.currentTime = 0;
            ballTouchSound.play();
        }
        
        if (
            boxX < 0 ||
            boxX + boxSize > canvas.width ||
            boxY < 0 ||
            boxY + boxSize > canvas.height
          ) {
            gameOver = true;
        }
        requestAnimationFrame(startGame);
    }
    else {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Game Over!!!', canvas.width/2 - 80, canvas.height/2);
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 60, canvas.height / 2 + 30);

        gameOverSound.currentTime = 0;
        gameOverSound.play();

        restartButton.style.visibility = 'visible';
        restartButton.addEventListener('click', restart);
    }
}

function restart() {
    boxX = canvas.width / 2 - boxSize / 2;
    boxY = canvas.height / 2 - boxSize / 2;
    ballX = getRandomPosition(canvas.width - ballSize);
    ballY = getRandomPosition(canvas.height - ballSize);
    score = 0;
    gameOver = false;


    restartButton.style.visibility = 'hidden';
    startGame();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && boxX > 0) {
      boxX -= 15;
    }
    if (event.key === 'ArrowRight' && boxX < canvas.width - boxSize) {
      boxX += 15;
    }
    if (event.key === 'ArrowUp' && boxY > 0) {
      boxY -= 15;
    }
    if (event.key === 'ArrowDown' && boxY < canvas.height - boxSize) {
      boxY += 15;
    }
  });
  

startGame();