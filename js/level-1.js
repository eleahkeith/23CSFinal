

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
  playerSpeed: boxSize/10,
  targetPositions: [{x: boxSize * 13, y: boxSize * 1}, {x: boxSize * 2, y: boxSize * 1}, {x: boxSize * 2, y: boxSize * 9}, {x: boxSize * 8, y: boxSize * 13}, {x: boxSize * 17, y: boxSize * 10}],
  targetPositionIndex: 0,
  questionMode: false
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
      if (maze[y][x] === 0 || maze[y][x] === 1 || maze[y][x] === 6) {
        ctx.fillStyle = "#BEBEBE";
        ctx.fillRect (x * boxSize, y * boxSize, boxSize, boxSize);
        ctx.strokeStyle = "#5C5C5C";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
      }
      if(maze[y][x] === 1) {
        ctx.drawImage(starImage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 2) {
        ctx.fillStyle="#3374FF";
        ctx.fillRect (x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 3) {
        ctx.drawImage(treeImage, x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 4) {
        ctx.drawImage(houseImage, x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 5) {
        ctx.drawImage(cityImage, x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 6) {
        ctx.drawImage(trophyImage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
    }
  }
}

function drawPlayer() {
  ctx.drawImage(characterIcon, state.playerX, state.playerY, boxSize, boxSize);
}

function masterPath() {
  if (state.questionMode === false) {
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
      getNextQuestion();
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
}

function updateTarget() {
  // if person presses/clicks, do this so she moves again
  state.targetPositionIndex += 1;
  var newTargetPosition = state.targetPositions[state.targetPositionIndex];
  state.playerTargetX = newTargetPosition.x;
  state.playerTargetY = newTargetPosition.y;
}

function displayQuestion() {
  //code that displays question when player hits target
  // if question is right, call arriveAtTarget
}



function runGame() {
  clearCanvas();
  drawMaze();
  drawPlayer();
  masterPath();
}

var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".answer"));
var currentQuestion = {};
var questionIndex = -1;

var questions = [
  {
    question: 'What day is today?',
    choice1: 'Monday',
    choice2: 'Tuesday',
    choice3: 'Wednesday',
    choice4: 'Thursday',
    answer: 1
  },
  {
    question: 'What time is it?',
    choice1: '1:00',
    choice2: '2:00',
    choice3: '3:00',
    choice4: '4:00',
    answer: 2
  },
  {
    question: 'What is your name?',
    choice1: 'Leah',
    choice2: 'Lucie',
    choice3: 'Piroschka',
    choice4: 'Nemiri',
    answer: 3
  },
  {
    question: 'Question 4',
    choice1: 'Answer A',
    choice2: 'Answer B',
    choice3: 'Answer C',
    choice4: 'Answer D',
    answer: 4
  },
  {
    question: 'Question 5',
    choice1: 'Answer 1',
    choice2: 'Answer 2',
    choice3: 'Answer 3',
    choice4: 'Answer 4',
    answer: 1
  }
]

function getNextQuestion() {
  state.questionMode = true;
  questionIndex++;
  var currentQuestion = questions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(function (choice, index) {
    choice.innerText = currentQuestion[`choice${index + 1}`];
  });

}

choices.forEach(function (choice, index) {
  choice.addEventListener("click", function () {
    var currentQuestion = questions[questionIndex];
    var isCorrect = currentQuestion.answer === index + 1;
    if (isCorrect) {
      alert("great job");
      state.questionMode = false;
      updateTarget();
    }
  })
})

setInterval(runGame,50);
