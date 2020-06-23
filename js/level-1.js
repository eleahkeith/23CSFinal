

var canvas = document.querySelector("#screen");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext("2d");
var body = document.querySelector("body");

var boxSize = canvas.width / 20;

var state = {
  playerX: boxSize * 15,
  playerY: boxSize * 1,
  gameEndX: boxSize * 19,
  gameEndY: boxSize * 6,
  playerSpeed: boxSize/10,
  questionOneX: boxSize * 13,
  questionOneY: boxSize * 1,
  questionTwoX: boxSize * 2,
  questionTwoY: boxSize * 1,
  questionThreeX: boxSize * 2,
  questionThreeY: boxSize * 9,
  questionFourX: boxSize * 8,
  questionFourY1: boxSize * 9,
  questionFourY2: boxSize * 13,
}

var maze = [
  [2,3,3,3,4,3,4,3,4,3,4,3,4,3,4,3,2,2,5,5],
  [2,3,1,0,0,0,0,0,0,0,0,0,0,1,0,0,4,2,5,5],
  [2,3,0,4,4,4,3,3,3,3,3,3,3,0,4,3,2,2,5,5],
  [2,3,0,4,3,3,3,2,2,2,2,2,3,0,4,3,2,3,5,5],
  [2,2,0,2,2,2,2,2,2,2,2,2,3,0,4,3,2,3,3,3],
  [3,3,0,4,4,4,3,2,2,2,2,2,3,0,4,2,2,3,5,5],
  [3,4,0,4,0,4,3,2,2,2,2,2,3,0,0,2,0,0,0,6],
  [3,4,0,4,0,4,3,3,3,3,2,3,4,0,4,2,3,5,5,0],
  [3,4,0,4,0,4,4,4,4,3,2,3,4,0,4,2,3,5,5,0],
  [3,4,1,0,0,0,0,0,0,3,2,2,2,4,3,2,3,5,5,0],
  [3,3,3,3,3,3,3,3,0,4,4,3,2,3,2,2,3,0,0,1],
  [3,3,3,0,0,0,3,3,0,3,3,3,2,2,2,3,5,0,5,0],
  [3,2,2,3,3,0,3,3,0,4,4,4,4,4,3,5,5,0,5,0],
  [3,2,2,3,3,0,0,0,1,0,0,0,0,0,0,0,0,0,5,5],
  [3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5]
];

function clearCanvas() {
  ctx.fillStyle="white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawMaze() {
  for(var y = 0; y < maze.length; y++) {
    for(var x = 0; x < maze[y].length; x++)
    {
      if(maze[y][x] === 1) {
        ctx.drawImage(starImage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 2) {
        ctx.fillStyle="blue";
        ctx.fillRect (x*boxSize, y*boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 3) {
        ctx.drawImage(treeImage, x*boxSize, y*boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 4) {
        ctx.drawImage(houseImage, x*boxSize, y*boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 5) {
        ctx.drawImage(cityImage, x*boxSize, y*boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 6) {
        ctx.drawImage(trophyImage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
    }
  }
}

function drawPlayer() {
  ctx.drawImage(characterIcon, state.playerX, state.playerY, boxSize, boxSize);
}

function pathToQuestionOne() {
  if (state.playerX >= state.questionOneX) {
    state.playerX -= state.playerSpeed;
    console.log(state.playerX);
  }
}

function pathToQuestionTwo() {
  if (state.playerX >= state.questionTwoX && state.playerY === state.questionTwoY) {
    state.playerX -= state.playerSpeed;
    console.log("hi");
  }
}

function pathToQuestionThree() {
  if (state.playerY <= state.questionThreeY && state.playerX <= state.questionThreeX) {
    state.playerY += state.playerSpeed;
  }
}

function questionFour1() {
  if ((state.playerX <= state.questionFourX) && (state.playerY >= state.questionFourY1)) {
    state.playerX += state.playerSpeed;
  }
}

function questionFour2() {
  if (state.playerX >= state.questionFourX && state.playerY <= state.questionFourY2 && state.playerY >= state.questionFourY1) {
    state.playerY += state.playerSpeed;
  }
}

async function pathToQuestionFour() {
  await questionFour1();
  questionFour2();
}

function pathToQuestionFive() {

}

function pathToTrophy() {

}

function masterPath() {
  pathToQuestionOne();
  pathToQuestionTwo();
  pathToQuestionThree();
  pathToQuestionFour();
  pathToQuestionFive();
  pathToTrophy();
}

function runGame() {
  clearCanvas();
  drawMaze();
  drawPlayer();
  masterPath();
}

setInterval(runGame,50);


// tomorrow - push x and y positions into an array in the state, then refer to those when calling the next function
