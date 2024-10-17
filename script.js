const board = document.getElementById("board");
const ctx = board.getContext("2d");
const scoreText = document.getElementById("score");
const reset = document.getElementById("reset"); 
const gameWidth = board.width;
const gameHeight = board.height;
const snakeColor = "#ff554d";
const snakeBorder = "#b01539";
const boardBackground = "black";
const foodColor = "green";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
   {x : unitSize * 4, y : 0}, 
   {x : unitSize * 3, y : 0}, 
   {x : unitSize * 2, y : 0}, 
   {x : unitSize, y : 0}, 
   {x : 0, y : 0}
];

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

window.addEventListener("keydown", changeDirection);
window.addEventListener("keydown", checkResetKey);
reset.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }else{
        displayGameOver();
    }
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood(){

    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);

    function randomFood(min, max){
        const x = Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return x;
    }
}

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake(){
    const first = { x : snake[0].x + xVelocity,
                    y : snake[0].y + yVelocity};
    snake.unshift(first);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreText.textContent = score;
        createFood();
    }else{
        snake.pop();
    }
}

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

function changeDirection(event){
    const keyIsPressed = event.keyCode;
    const isGoingUp = (yVelocity == -unitSize);
    const isGoingDown = (yVelocity == unitSize);
    const isGoingLeft = (xVelocity == -unitSize);
    const isGoingRight = (xVelocity == unitSize);

    switch(true){
        case(keyIsPressed == LEFT && !isGoingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyIsPressed == RIGHT && !isGoingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;   
        case(keyIsPressed == UP && !isGoingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break; 
        case(keyIsPressed == DOWN && !isGoingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break; 
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x < 0 || snake[0].x > gameWidth):
            running = false;
            break;
        case(snake[0].y < 0 || snake[0].y > gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if((snake[i].x == snake[0].x) && (snake[i].y == snake[0].y)){
            running = false;
        }
    }
}

function displayGameOver(){
    ctx.font = "50px Sixtyfour Convergence";
    ctx.fillText("GAME OVER !", gameWidth / 2 - 220, gameHeight / 2);
    running = false;
}

function checkResetKey(event){
    const keyIsPressed = event.keyCode;
    if(keyIsPressed == 82){
        resetGame();
    }
}

function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x : unitSize * 4, y : 0}, 
        {x : unitSize * 3, y : 0}, 
        {x : unitSize * 2, y : 0}, 
        {x : unitSize, y : 0}, 
        {x : 0, y : 0}
     ];
     gameStart();
}