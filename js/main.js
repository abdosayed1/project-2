const game_container = document.querySelector(".game-container");
const bird = document.querySelector(".bird");
const sky = document.querySelector(".sky");
const ground = document.querySelector(".ground");
const scoreBannal = document.createElement("div");
scoreBannal.classList.add('score');
let bird_position = {
  right: 400,
  top: 250
}
let obstacles = [];
let score = 0;
let obstacleNum = 0;
let gravityTimer;
let obstacleTimer;


scoreBannal.addEventListener('click', restart);

const start_btn = document.createElement("div");
start_btn.classList.add("start");
start_btn.innerText = "start";

sky.appendChild(start_btn);

start_btn.addEventListener("click", start);

document.addEventListener("click", jump);

function gravity() {
  if(bird_position.top < 550 ){
    bird_position.top += 5;
    bird.style.top = bird_position.top + "px";
  }
}

function jump() {
  if(bird_position.top > 38){
    bird_position.top -= 75;
    bird.style.top = bird_position.top + "px";
  }
}

function generateObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add('obstacle');
  obstacle.style.right = -100 + "px";
  obstacle.style.top = Math.random() * 500 + "px";
  //obstacle = 200 + "px";
  sky.appendChild(obstacle);
  obstacles.push(obstacle);
  score++;
}

function moveObstacles() {
  let obsPositionRight = parseInt(obstacles[obstacleNum].style.right);
  let obsPositionTop = parseInt(obstacles[obstacleNum].style.top);
  obstacles[obstacleNum].style.right = obsPositionRight + 5 + "px";
  if(obsPositionRight > 500) {
    obstacleNum++;
    generateObstacle();
  }
  if(
    bird_position.top >= 550
    || (
      obsPositionRight > 285 &&
      obsPositionRight < 450 &&
      bird_position.top > (obsPositionTop + 120)
    )
    || (
      obsPositionRight > 285 &&
      obsPositionRight < 450 &&
      bird_position.top < obsPositionTop
    )
  ){
    gameOver()
  }
}

function start() {
  sky.removeChild(start_btn);
  bird.style.top = bird_position.top + "px";
  bird.style.right = bird_position.right + "px";
  gravityTimer = setInterval(gravity, 100);
  generateObstacle();
  obstacleTimer = setInterval(moveObstacles, 100)
}

function gameOver() {
  clearInterval(gravityTimer);
  clearInterval(obstacleTimer);
  scoreBannal.innerText = score;
  sky.appendChild(scoreBannal);
}

function restart() {
  sky.removeChild(scoreBannal);
  obstacles.forEach(e => {
    e.classList.remove('obstacle');
  });
  score = 0;
  bird_position = {
    right: 400,
    top: 250
  };
  obstacles = [];
  obstacleNum = 0;
  bird.style.top = bird_position.top + "px";
  bird.style.right = bird_position.right + "px";
  gravityTimer = setInterval(gravity, 100);
  generateObstacle();
  obstacleTimer = setInterval(moveObstacles, 100)
}