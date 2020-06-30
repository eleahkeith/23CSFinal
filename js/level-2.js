// BURGER MENU
const navItems = document.querySelector("nav ul");
const burgerIcon = document.querySelector(".burger-icon");

function toggleBurgerMenu(icon) {
  icon.classList.toggle("transform");
  navItems.classList.toggle("burger-open");
}

burgerIcon.addEventListener("click", function () { toggleBurgerMenu(this) });

var canvas = document.querySelector("#screen")
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");

const boxSize = canvas.width / 20;
const characterimage = document.querySelector("#characterimage");

var state = {
  question: 1,
  character: { x: boxSize * 15, y: boxSize * 14, interval: 120 },
  question1: {
    question: "Which of these result in the output Hello World! on the console?",
    answers: ["console log Hello World!", "console.log(\"Hello World!\");", "console.log\"Hello World!\";", "console.log(Hello World!);"],
    correct: "answer2"
  },
  question2: {
    question: "Which is true about variables?",
    answers: ["A variable is used to store a value", "A variable can never be changed", "A variable can only be a number", "A variable can only be a string"],
    correct: "answer1"
  },
  question3: {
    question: "How would we assign a value to a varaible",
    answers: ["up = var direction;", "direction = var up;", "var = direction up; ", "var direction = 'up';"],
    correct: "answer4"
  },
  question4: {
    question: "What can we code to stop Charlie from walking into the buildings, houses, water or trees?",
    answers: ["Collision detection", "for loop", "setInterval()", "An array"],
    correct: "answer1"
  },
  question5: {
    question: "We can make it easier to give Charlie directions by writing functions. What is a function?",
    answers: ["A function is a block of code that can only be used once", "A function is a type of for loop", "A function is a named block of code that we can use as many times as needed", "Functions are code that always return a value"],
    correct: "answer3"
  },
  question6: {
    question: "Which path will get Charlie to the next star?",
    answers: ["X + 1 spaces, then Y + 4 spaces, then X + 2 spaces, then Y - 1 spaces", "X - 1 spaces, then Y - 4 spaces, then X - 2 spaces, then Y + 1 spaces", "'X - 1 spaces, then Y - 4 spaces, then X + 2 spaces, then Y - 1 spaces'", "'X - 1 spaces, then Y - 5 spaces, then X + 2 spaces, then Y - 1 spaces'"],
    correct: "answer3"
  },
  question7: {
    question: "What is the correct syntax to write a JavaScript function?",
    answers: ["function walk = steps + direction", "function walk(steps, direction) { }", "function = walk(steps, direction) { }", "walk(steps, direction) { } = function"],
    correct: "answer2"
  },
  question8: {
    question: "which answer will get Charlie to the trophy using the function walk(steps, direction)?",
    answers: ["walk 1 up; walk 3 left; walk 1 up;", "walk(3, up); walk(3, left);", "walk(3, left); walk(3, up);", "walk(2, 'up'); walk(3, 'left'); walk(1, 'up');"],
    correct: "answer4"
  },
}

// Start screen
function drawStartScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px VT323";
  ctx.fillStyle = "#59EA59";
  ctx.textAlign = "center";
  ctx.fillText("Level 2", canvas.width / 2, canvas.height * .4);
  ctx.fillText("Touch To Start", canvas.width / 2, canvas.height * .6);
  canvas.addEventListener("click", startGame);
}

function startGame() {
  start = setInterval(runGame, 100);
}

function runGame() {
  drawMaze();
  drawCharacter();
  setQuestionText(getQuestion());
}

// Maze
var maze = [
  [5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
  [5, 5, 5, 5, 0, 5, 0, 5, 5, 0, 3, 3, 3, 0, 3, 0, 0, 0, 1, 0],
  [5, 0, 5, 0, 1, 5, 0, 0, 3, 3, 2, 2, 2, 0, 3, 3, 3, 3, 0, 3],
  [5, 0, 5, 0, 3, 3, 3, 3, 3, 3, 2, 3, 2, 0, 2, 2, 2, 2, 0, 2],
  [5, 0, 0, 0, 3, 2, 2, 2, 2, 3, 2, 3, 0, 1, 3, 3, 3, 3, 0, 3],
  [3, 3, 3, 0, 3, 2, 3, 3, 2, 2, 2, 3, 0, 4, 4, 4, 4, 0, 0, 4],
  [2, 2, 2, 0, 2, 2, 2, 2, 2, 3, 3, 0, 0, 4, 0, 0, 0, 4, 0, 4],
  [3, 3, 3, 1, 3, 3, 3, 0, 0, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
  [4, 0, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 4],
  [4, 0, 4, 4, 4, 0, 4, 0, 4, 0, 1, 0, 4, 4, 4, 0, 4, 1, 4, 4],
  [4, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 4],
  [4, 0, 4, 4, 0, 4, 0, 4, 4, 0, 4, 4, 3, 4, 4, 0, 4, 4, 0, 4],
  [4, 0, 1, 0, 0, 4, 0, 3, 3, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 4],
  [4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4],
]

// Change var y to var mazeY and var x to var mazeX?
function drawMaze() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var y = 0; y < maze.length; y++) {
    for (var x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 0 || maze[y][x] === 1 || maze[y][x] === 6) {
        ctx.fillStyle = "#BEBEBE";
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        ctx.strokeStyle = "#5C5C5C";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 1) {
        ctx.drawImage(starimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
      else if (maze[y][x] === 2) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
      }
      else if (maze[y][x] === 3) {
        ctx.drawImage(treeimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
      else if (maze[y][x] === 4) {
        ctx.drawImage(houseimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
      else if (maze[y][x] === 5) {
        ctx.drawImage(cityimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
      else if (maze[y][x] === 6) {
        ctx.drawImage(trophyimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
    }
  }
}

// Charactor and movement
function drawCharacter() {
  ctx.drawImage(characterimage, state.character.x, state.character.y, boxSize, boxSize);
}

// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveUp(count) {
  for (let i = 0; i < count; i++) {
    state.character.y = state.character.y - boxSize;
    await sleep(state.character.interval);
  }
}

async function moveDown(count) {
  for (let i = 0; i < count; i++) {
    state.character.y = state.character.y + boxSize;
    await sleep(state.character.interval);
  }
}

async function moveLeft(count) {
  for (let i = 0; i < count; i++) {
    state.character.x = state.character.x - boxSize;
    await sleep(state.character.interval);
  }
}

async function moveRight(count) {
  for (let i = 0; i < count; i++) {
    state.character.x = state.character.x + boxSize;
    await sleep(state.character.interval);
  }
}

// Questions and anwsers
function setQuestionText(question) {
  let questionText = document.getElementById("question");
  let answer1 = document.getElementById("answer1");
  let answer2 = document.getElementById("answer2");
  let answer3 = document.getElementById("answer3");
  let answer4 = document.getElementById("answer4");

  questionText.innerText = question.question;
  answer1.innerText = question.answers[0];
  answer2.innerText = question.answers[1];
  answer3.innerText = question.answers[2];
  answer4.innerText = question.answers[3];

  // Make Q&A visible after start screen
  questionText.style.visibility = "visible";
  answer1.style.visibility = "visible";
  answer2.style.visibility = "visible";
  answer3.style.visibility = "visible";
  answer4.style.visibility = "visible";
}

// User interaction
async function answerQuestion(e) {
  if (e.target.id.startsWith("answer")) {
    let question = getQuestion();
    if (e.target.id === question.correct) {
      e.target.style.color = "#59EA59";
      await correctAnswer();
      resetAnswer();
      state.question++;
      console.log("correct");
      if (state.question === 9 && e.target.id === state.question8.correct) {
        finish();
      }
    }
    else {
      e.target.style.color = "#FF0000";
      console.log("wrong");
    }
  }
}

addEventListener("click", answerQuestion);

function resetAnswer() {
  answer1.style.color = "black";
  answer2.style.color = "black";
  answer3.style.color = "black";
  answer4.style.color = "black";
}

function getQuestion() {
  switch (state.question) {
    case 1:
      return state.question1;
      break;
    case 2:
      return state.question2;
      break;
    case 3:
      return state.question3;
      break;
    case 4:
      return state.question4;
      break;
    case 5:
      return state.question5;
      break;
    case 6:
      return state.question6;
      break;
    case 7:
      return state.question7;
      break;
    case 8:
      return state.question8;
      break;
    default:
      return state.question8;
  }
}

async function correctAnswer() {
  if (state.question === 1) {
    await moveUp(1);
    await moveRight(3);
    await moveUp(2);
    await moveLeft(1);
    await moveUp(1);
  }
  else if (state.question === 2) {
    await moveUp(1);
    await moveRight(1);
    await moveUp(7);
  }
  else if (state.question === 3) {
    await moveLeft(3);
    await moveUp(1);
    await moveLeft(2);
    await moveDown(4);
  }
  else if (state.question === 4) {
    await moveLeft(1);
    await moveDown(2);
    await moveLeft(1);
    await moveDown(3);
    await moveLeft(1);
  }
  else if (state.question === 5) {
    await moveLeft(1);
    await moveUp(2);
    await moveLeft(2);
    await moveDown(3);
    await moveLeft(3);
    await moveDown(2);
    await moveLeft(2);
  }
  else if (state.question === 6) {
    await moveLeft(1);
    await moveUp(4);
    await moveRight(2);
    await moveUp(1);
  }
  else if (state.question === 7) {
    await moveUp(5);
    await moveRight(1);
  }
}

// Finish level 2 and load level 3
async function finish() {
  await moveUp(2);
  await moveLeft(3);
  await moveUp(1);
  complete();
}

function drawLevelCompleteScreen(e) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px VT323";
  ctx.fillStyle = "#59EA59";
  ctx.textAlign = "center";
  ctx.fillText("Congratulations!", canvas.width / 2, canvas.height * .3);
  ctx.fillText("Level 2 Completed", canvas.width / 2, canvas.height * .5);
  ctx.fillText("Touch To Continue", canvas.width / 2, canvas.height * .7);
}

function complete() {
  clearInterval(start);
  drawLevelCompleteScreen();
  addEventListener("click", level3);
}

function level3() {
  location.href = "level-3.html";
}