

var canvas = document.querySelector("#screen");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext("2d");
var body = document.querySelector("body");

var boxSize = canvas.width / 20;

var state = {
  playerX: boxSize * 15,
  playerY: boxSize * 1,
  playerTargetX: boxSize * 13,
  playerTargetY: boxSize * 1,
  gameEndX: boxSize * 19,
  gameEndY: boxSize * 6,
  playerSpeed: boxSize/10,
  targetPositions: [{x: boxSize * 13, y: boxSize * 1}, {x: boxSize * 2, y: boxSize * 1}, {x: boxSize * 2, y: boxSize * 9}, {x: boxSize * 8, y: boxSize * 13}, {x: boxSize * 17, y: boxSize * 10}],
  targetPositionIndex: 0
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
  [3,3,3,3,3,3,3,3,0,4,4,3,2,3,2,2,3,1,0,0],
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
  var isMovingLeft = state.playerX > state.playerTargetX;
  var isMovingUp = state.playerY > state.playerTargetY;
  var isMovingRight = state.playerX < state.playerTargetX;
  var isMovingDown = state.playerY < state.playerTargetY;
  var movePlayerUp = state.playerSpeed * -1;
  var movePlayerLeft = state.playerSpeed * -1;
  var movePlayerDown = state.playerSpeed;
  var movePlayerRight = state.playerSpeed;
  var distanceFromTargetX = Math.abs(state.playerX - state.playerTargetX);
  var distanceFromTargetY = Math.abs(state.playerY - state.playerTargetY);
  if (distanceFromTargetX <= 0 && distanceFromTargetY <= 0) {
    arriveAtTarget();
  } else if (isMovingLeft) {
    state.playerX += movePlayerLeft;
  } else if (isMovingRight) {
    state.playerX += movePlayerRight;
  } else if (isMovingUp) {
    state.playerY += movePlayerUp;
  } else if (isMovingDown) {
    state.playerY += movePlayerDown;
  }
}

function arriveAtTarget() {
  // if person presses/clicks, do this so she moves again
  state.targetPositionIndex += 1;
  var newTargetPosition = state.targetPositions[state.targetPositionIndex];
  state.playerTargetX = newTargetPosition.x;
  state.playerTargetY = newTargetPosition.y;
}
// function pathToQuestionTwo() {
//   if (state.playerX >= state.questionTwoX && state.playerY === state.questionTwoY) {
//     state.playerX -= state.playerSpeed;
//     console.log("hi");
//   }
// }
//
// function pathToQuestionThree() {
//   if (state.playerY <= state.questionThreeY && state.playerX <= state.questionThreeX) {
//     state.playerY += state.playerSpeed;
//   }
// }
//
// async function questionFour1() {
//   return new Promise(function (resolve, reject) {
//     var playerAtGoal = (state.playerX <= state.questionFourX) && (state.playerY >= state.questionFourY1);
//     if (playerAtGoal) {
//       state.playerX += state.playerSpeed;
//     }
//   })
// }
//
// function questionFour2() {
//   if (state.playerX >= state.questionFourX && state.playerY <= state.questionFourY2 && state.playerY >= state.questionFourY1) {
//     state.playerY += state.playerSpeed;
//   }
// }
//
// async function pathToQuestionFour() {
//   await questionFour1();
//   questionFour2();
// }

function pathToQuestionFive() {

}

function pathToTrophy() {

}

function masterPath() {
  pathToQuestionOne();
  // pathToQuestionTwo();
  // pathToQuestionThree();
  // pathToQuestionFour();
  // pathToQuestionFive();
  // pathToTrophy();
}

function runGame() {
  clearCanvas();
  drawMaze();
  drawPlayer();
  masterPath();
}

setInterval(runGame,50);


// tomorrow - push x and y positions into an array in the state, then refer to those when calling the next function
