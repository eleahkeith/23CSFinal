// BURGER MENU
const navItems = document.querySelector("nav ul");
const burgerIcon = document.querySelector(".burger-icon");

function toggleBurgerMenu(icon) {
  icon.classList.toggle("transform");
  navItems.classList.toggle("burger-open");
}

burgerIcon.addEventListener("click", function(){toggleBurgerMenu(this)});


var canvas = document.querySelector("#screen");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext("2d");
var body = document.querySelector("body");

var boxSize = canvas.width / 20;
var questionVisibility = document.querySelector("#question");
var answerVisibility = document.querySelectorAll(".answer");

var state = {
  playerX: boxSize * 15,
  playerY: boxSize * 1,
  playerTargetX: boxSize * 13,
  playerTargetY: boxSize * 1,
  playerSpeed: 1,
  targetPositions: [
    {x: boxSize * 13, y: boxSize * 1},
    {x: boxSize * 2, y: boxSize * 1},
    {x: boxSize * 2, y: boxSize * 9},
    {x: boxSize * 8, y: boxSize * 13},
    {x: boxSize * 17, y: boxSize * 10},
    {x: boxSize * 19, y: boxSize * 6}
  ],
  targetPositionIndex: 0,
  questionMode: false,
  gameComplete: false,
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
  canvas.removeEventListener("click", handleClick);
  ctx.fillStyle="white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function handleClick() {
  var gameInterval = setInterval(runGame,10);
  if (state.gameComplete === false) {
    console.log('game active');
  } else {
    console.log('loop over')
    clearInterval(gameInterval);
    window.location.assign("../level-2.html");
  }
}

function drawStartScreen() {
  canvas.addEventListener("click",handleClick);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px VT323";
  ctx.fillStyle = "#59EA59";
  ctx.textAlign = "center";
  ctx.fillText("Level 1", canvas.width/2, canvas.height * .4 );
  ctx.fillText("Touch To Start", canvas.width/2, canvas.height * .6);
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
        ctx.drawImage(starimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 2) {
        ctx.fillStyle="#3374FF";
        ctx.fillRect (x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 3) {
        ctx.drawImage(treeimage, x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 4) {
        ctx.drawImage(houseimage, x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 5) {
        ctx.drawImage(cityimage, x*boxSize, y*boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 6) {
        ctx.drawImage(trophyimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
    }
  }
}

function drawPlayer() {
  ctx.drawImage(charactericon, state.playerX, state.playerY, boxSize, boxSize);
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
    if (distanceFromTargetX <= 1 && distanceFromTargetY <= 1) {
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




function runGame() {
  clearCanvas();
  drawMaze();
  drawPlayer();
  masterPath();
  console.log('running');
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
  state.playerX = state.playerTargetX;
  state.playerY = state.playerTargetY;
  state.questionMode = true;
  document.querySelector("#question").style.visibility="visible";
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    var currentQuestion = questions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(function (choice, index) {
      choice.innerText = currentQuestion[`choice${index + 1}`];
      choice.style.color="#000";
    });
  } else {
    state.gameComplete = true;
    drawCompleteScreen();
  }
}

choices.forEach(function (choice, index) {
  choice.addEventListener("click", function () {
    var currentQuestion = questions[questionIndex];
    var isCorrect = currentQuestion.answer === index + 1;
    if (isCorrect) {
      choice.style.color="#59EA59";
      state.questionMode = false;
      updateTarget();
    } else {
      choice.style.color="#FF0000";
    }
  })
})

function drawCompleteScreen() {
  state.gameComplete = true;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px VT323";
  ctx.fillStyle = "#59EA59";
  ctx.textAlign = "center";
  ctx.fillText("Congratulations!", canvas.width/2, canvas.height * .3 );
  ctx.fillText("Level 1 Completed", canvas.width/2, canvas.height * .5 );
  ctx.fillText("Touch To Continue", canvas.width/2, canvas.height * .7);
  console.log("complete screen");
}

drawStartScreen();
