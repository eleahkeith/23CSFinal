// BURGER MENU
const navItems = document.querySelector("nav ul");
const burgerIcon = document.querySelector(".burger-icon");

function toggleBurgerMenu(icon) {
  icon.classList.toggle("transform");
  navItems.classList.toggle("burger-open");
}

burgerIcon.addEventListener("click", function(){toggleBurgerMenu(this)});

// QUIZ - LEVEL 3
var state = {
  quizMode: "startScreen",
  questionNumber: 1,
  pathBranch: "",
  characterX: 1,
  characterY: 14,
  nextQuestionDelay: 0,
}

// CANVAS & MAZE
const canvas = document.querySelector("#screen");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");

const starimage = document.querySelector("#starimage");
const treeimage = document.querySelector("#treeimage");
const houseimage = document.querySelector("#houseimage");
const cityimage = document.querySelector("#cityimage");
const trophyimage = document.querySelector("#trophyimage");
const bridgeimage = document.querySelector("#bridgeimage");
const characterimage = document.querySelector("#characterimage");

const boxSize = canvas.width/20;

const maze = [
  [4,3,4,4,4,4,4,4,4,4,4,0,0,5,5,5,2,5,5,5],
  [4,0,4,0,0,0,0,0,0,4,0,4,0,0,0,5,2,5,0,5],
  [4,0,4,0,4,3,4,0,4,4,0,1,0,5,0,5,2,5,0,5],
  [4,1,0,0,4,0,0,1,0,0,4,0,5,5,0,1,2,1,0,5],
  [3,0,4,4,4,0,4,3,4,0,4,0,5,5,5,5,2,5,0,5],
  [4,0,0,0,4,0,4,0,4,0,3,0,0,0,5,0,2,0,0,6],
  [4,0,4,4,4,0,4,0,0,0,4,0,4,0,5,5,2,5,0,5],
  [4,0,4,0,3,0,4,4,0,3,4,0,4,4,0,1,2,1,0,5],
  [0,0,4,0,4,0,4,4,0,3,0,1,4,4,0,5,2,5,5,5],
  [4,0,0,0,4,0,4,0,1,0,0,4,4,3,0,3,2,2,2,2],
  [3,4,4,0,4,0,0,4,0,4,0,4,0,0,0,3,3,3,3,3],
  [4,0,0,1,4,0,4,0,0,4,0,4,0,3,0,4,0,0,3,3],
  [4,0,4,0,4,0,4,4,4,1,0,4,1,0,0,3,3,0,0,0],
  [4,0,4,0,4,0,3,0,0,0,3,3,0,4,0,0,0,0,3,0],
  [4,1,4,0,0,1,4,4,4,0,0,0,0,3,3,3,3,0,3,3],
]

function drawMaze() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var y = 0; y < maze.length; y++) {
    for (var x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 0 || maze[y][x] === 1 || maze[y][x] === 6) {
        ctx.fillStyle = "#BEBEBE";
        ctx.fillRect (x * boxSize, y * boxSize, boxSize, boxSize);
        ctx.strokeStyle = "#5C5C5C";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 1) {
        ctx.drawImage(starimage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 2) {
        ctx.fillStyle = "#3374FF";
        ctx.fillRect (x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 3) {
        ctx.drawImage(treeimage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 4) {
        ctx.drawImage(houseimage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 5) {
        ctx.drawImage(cityimage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 6) {
        ctx.drawImage(trophyimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
    }
  }
}

function drawBridge() {
  if (state.questionNumber >= 8) {
    if (state.pathBranch === "a") {
      var x = 16;
      var y = 7;
    } else if (state.pathBranch === "b") {
      var x = 16;
      var y = 3;
    }
  }
  ctx.drawImage(bridgeimage, x * boxSize, y * boxSize, boxSize, boxSize);
}

function drawStartScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px VT323";
  ctx.fillStyle = "#59EA59";
  ctx.textAlign = "center";
  ctx.fillText("Level 3", canvas.width/2, canvas.height * .4 );
  ctx.fillText("Touch To Start", canvas.width/2, canvas.height * .6);
}

function drawLevelCompleteScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px VT323";
  ctx.fillStyle = "#59EA59";
  ctx.textAlign = "center";
  ctx.fillText("Congratulations!", canvas.width/2, canvas.height * .3 );
  ctx.fillText("Level 3 Completed", canvas.width/2, canvas.height * .5 );
  ctx.fillText("Touch To Continue", canvas.width/2, canvas.height * .7);
}

function drawCharacter() {
  ctx.drawImage(characterimage, state.characterX * boxSize, state.characterY * boxSize, boxSize, boxSize);
}

function oneStep(direction) {
  if (direction === "up") {
    state.characterY -= 1;
  } else if (direction === "down") {
    state.characterY += 1;
  } else if (direction === "left") {
    state.characterX -= 1;
  } else if (direction === "right") {
    state.characterX += 1;
  }
}

const paths = {
  path12: ["up","up","up","right","right"],
  path23a: ["down","down","down","right","right"],
  path23b: ["up","up","left","left","up","up","up","up","up","up"],
  path3a4: ["up","up","up","up","up","up","up","up","up","up","up","right","right"],
  path3b4: ["right","right","up","up","right","right","right","right","down","down"],
  path45: ["right","right","down","down","down","left","down","down","down"],
  path56a: ["right","right","down","down","down","left"],
  path56b: ["right","right","up","right"],
  path6a7a: ["down","down","right","right","right","up","up"],
  path6b7b: ["up","up","up","up","up","up"],
  path7a8a: ["right","right","up","up","up","up","up","right"],
  path7b8b: ["right","up","right","right","down","down","right"],
  path910: ["right","right"],
  path10a11: ["right","up","up","right"],
  path10b11: ["right","down","down","right"],
}

function getPath() {
  var path = "path" + state.questionNumber;
  if ([1, 4, 9].includes(state.questionNumber)) {
    path += (state.questionNumber + 1);
  } else if ([2, 5].includes(state.questionNumber)) {
    path += (state.questionNumber + 1) + state.pathBranch;
  } else if ([3, 10].includes(state.questionNumber)) {
    path += state.pathBranch + (state.questionNumber + 1);
  } else {
    path += state.pathBranch + (state.questionNumber + 1) + state.pathBranch;
  }
  return path;
}

function updateCanvas() {
  if (state.questionNumber === 8) {
    drawBridge();
    state.nextQuestionDelay = 1;
  } else {
    var path = getPath();
    for (var i = 0; i < paths[path].length; i++) {
      moveCharacter(i, path);
    }
    state.nextQuestionDelay = i;
  }
}

function moveCharacter(i, path) {
  setTimeout(function() {
    oneStep(paths[path][i]);
    drawMaze();
    drawBridge();
    drawCharacter();
  }, 150 * i);
}

// QUIZ
const questionBox = document.querySelector("#question");
const answerBoxes = [document.querySelector("#answer1"), document.querySelector("#answer2"),
  document.querySelector("#answer3"), document.querySelector("#answer4")];

const quiz = {
  q1: {q: "Level 3.1: <br> function walk(steps, direction) {...};",
        a1: ["function walk(3, 'up'); function walk(2, 'right');", false],
        a2: ["walk() {3, 'up'}; walk() {2, 'right};", false],
        a3: ["walk(3, 'up'); walk(2, 'right');", true],
        a4: ["walk('up', 3); walk('right', 2);", false]},
  q2: {q: "Level 3.2: <br> function runUp(steps) {...}; function runDown(steps) {...}; function runRight(steps) {...}; function runLeft(steps) {...};",
        a1: ["runUp(2); runLeft(2); runUp(6);", true, "b"],
        a2: ["runDown{3}; runRight{2};", false],
        a3: ["runUp(2), runleft(2), runUp(6);", false],
        a4: ["runDown(3); runRight(2);", true, "a"]},
  q3a: {q: "Level 3.3a: <br> var i = 0; while (i < number) {runUpOneStep(); i++}; runRight(2);",
        a1: ["number = 9", false],
        a2: ["number = 10", false],
        a3: ["number = 11", true],
        a4: ["number = 12", false]},
  q3b: {q: "Level 3.3b: <br> function path() {walk(2,'right');",
        a1: ["walk(2,'up'); walk(4,'left'); walk(2,'down')};", false],
        a2: ["walk(2,'up'); walk(4,'left'); walk(2,'up')}; path();", false],
        a3: ["walk(2,'up'); walk(4,'right); walk(2,down'); path();", false],
        a4: ["walk(2,'up'); walk(4,'right'); walk(2,'down')}; path();", true]},
  q4: {q: "Level 3.4: <br> var x = 2; var y = 3; var z = 4;",
        a1: ["runRight(x); runDown(y); runLeft(y - x); runDown(y);", true],
        a2: ["runRight(var x); runDown(var y); runLeft(var y - var x);", false],
        a3: ["runRight(x); runDown(z); runLeft(x - y); runDown(y);", false],
        a4: ["runRight(x); runDown(y); runLeft(z - x); runDown(x);", false]},
  q5: {q: "Level 3.5: <br> walk(2, 'right'); <br> var options = {number: [1, 2, 3], direction: ['up', 'down', 'right']};",
        a1: ["walk(options.number[1], options.direction[1]); walk(1, 'right');", false],
        a2: ["walk(options.number[0], options.direction[0]); walk(1, 'right');", true, "b"],
        a3: ["walk(options.number[3], options.direction[2]); walk(1, 'left');", false],
        a4: ["walk(options.number[2], options.direction[1]); walk(1, 'left');", true, "a"]},
  q6a: {q: "Level 3.6a: <br> var steps = [1, 3]; steps.push(2);",
        a1: ["runDown(steps(2)); runRight(steps(1)); runUp(steps(2));", false],
        a2: ["runDown(steps[3]); runLeft(steps[1]); runUp(steps[2]);", false],
        a3: ["runDown(steps[3]); runRight(steps[2]); runUp(steps[3]);", false],
        a4: ["runDown(steps[2]); runRight(steps[1]); runUp(steps[2]);", true]},
  q6b: {q: "Level 3.6b: <br> for (var i = 10; i > number; i--) {runUpOneStep();};",
        a1: ["number = 3", false],
        a2: ["number = 4", true],
        a3: ["number = 5", false],
        a4: ["number = 6", false]},
  q7a: {q: "Level 3.7a: <br> runRight(2); for (var i=10; i > number; i--) {runUpOneStep();}; runRight(1);",
        a1: ["number = 3", false],
        a2: ["number = 4", false],
        a3: ["number = 5", true],
        a4: ["number = 6", false]},
  q7b: {q: "Level 3.7b: <br> runRight(1); runUp(1); var steps = [1, 3, 4, 2]; steps.splice(2, 1);",
        a1: ["runRight(steps[2]); runDown(steps[2]); runRight(steps[0]);", true],
        a2: ["runRight(steps[3]); runDown(steps[3]); runRight(steps[0]);", false],
        a3: ["runRight(steps(2)); runDown(steps(2)); runRight(steps(1));", false],
        a4: ["runRight(steps[3]); runDown(steps[3]); runRight(steps[1]);", false]},
  q8: {q: "Level 3.8: <br> var riverWidth = 1; var riverDepth = 'deep'; <br> if (condition) {buildBridge();} else {goHome();};",
        a1: ["Condition is: riverWidth = 1 && riverDepth = 'deep'", false],
        a2: ["Condition is: riverWidth >= 1 && riverDepth === 'deep'", true],
        a3: ["Condition is: riverWidth == 1 && riverDepth != 'deep'", false],
        a4: ["Condition is: riverWidth < 1 && riverDepth == 'deep'", false]},
  q9: {q: "Level 3.9: <br> var bridgeExists = true; if (condition) {goHome();} else {crossBridge();}",
        a1: ["Condition is: bridgeExists === true", false],
        a2: ["Condition is: bridgeexists === false", false],
        a3: ["Condition is: bridgeExists !== true", true],
        a4: ["Condition is: bridgeExists = false", false]},
  q10a: {q: "Level 3.10a: <br> function runToExit(a, b, c) {runRight(a); runUp(b); runRight(c);};",
        a1: ["runToExit(1, 2, 1);", true],
        a2: ["runToExit(b = 2, a = 1, c = 1);", false],
        a3: ["var a = 1; var b = 2; var c = 1; runToExit();", false],
        a4: ["runToExit(1; 2; 1);", false]},
  q10b: {q: "Level 3.10b: <br> function runToExit(a, b, c) {runRight(a); runDown(b); runRight(c);};",
        a1: ["runToExit(b = 2, a = 1, c = 1);", false],
        a2: ["var a = 1; var b = 2; var c = 1; runToExit();", false],
        a3: ["runToExit{1, 2, 1};", false],
        a4: ["runToExit(1, 2, 1);", true]},
}

function quizVisibility(value) {
  if (value === "hidden") {
    questionBox.style.visibility = "hidden";
    for (var i = 0; i < 4; i++) {
      answerBoxes[i].style.visibility = "hidden";
    }
  } else if (value === "visible") {
    questionBox.style.visibility = "visible";
    for (var i = 0; i < 4; i++) {
      answerBoxes[i].style.visibility = "visible";
    }
  }
}

function getQuestionNumber() {
  if ([3, 6, 7, 10].includes(state.questionNumber)) {
    return "q" + state.questionNumber + state.pathBranch;
  } else {
    return "q" + state.questionNumber;
  }
}

function addQuestion() {
  var question = getQuestionNumber();
  var text = quiz[question].q;
  questionBox.innerHTML = text;
}

function addAnswers() {
  var question = getQuestionNumber();
  for (var i = 0; i < 4; i++) {
    var answer = "a" + (i + 1);
    var text = quiz[question][answer][0];
    answerBoxes[i].innerHTML = text;
  }
}

function startQuiz() {
  state.quizMode = "started";
  quizVisibility("visible");
  drawMaze();
  drawCharacter();
  addQuestion();
  addAnswers();
}

function nextQuestion() {
  for (var i = 0; i < 4; i++) {
    answerBoxes[i].style.color = "#000";
  }
  state.questionNumber += 1;
  addQuestion();
  addAnswers();
  for (var i = 0; i < 4; i++) {
    answerBoxes[i].addEventListener("click", handleAnswerClick);
  }
}

function handleCanvasClick(e) {
  if (state.quizMode === "startScreen") {
    startQuiz();
  } else if (state.quizMode === "completed") {
    window.location.assign("../game-complete.html")
  }
}

function handleAnswerClick(e) {
  var question = getQuestionNumber();
  if (e.target.id === "answer1") {
    var a = "a1";
  } else if (e.target.id === "answer2") {
    var a = "a2";
  } else if (e.target.id === "answer3") {
    var a = "a3";
  } else if (e.target.id === "answer4") {
    var a = "a4";
  }
  var answerTrue = quiz[question][a][1];
  if (state.quizMode === "started" && answerTrue === true) {
    for (var i = 0; i < 4; i++) {
      answerBoxes[i].removeEventListener("click", handleAnswerClick);
    }
    e.target.style.color = "#59EA59";
    if (state.questionNumber === 2 || state.questionNumber === 5) {
      state.pathBranch = quiz[question][a][2];
    }
    updateCanvas();
    if (state.questionNumber === 10) {
      state.quizMode = "completed";
      setTimeout(function() {drawLevelCompleteScreen();
        quizVisibility("hidden");}, 150 * state.nextQuestionDelay);
    } else {
      setTimeout(nextQuestion, 150 * state.nextQuestionDelay);
    }
  } else if (state.quizMode === "started" && answerTrue === false) {
    e.target.style.color = "#FF0000";
  }
}

canvas.addEventListener("click", handleCanvasClick);
for (var i = 0; i < 4; i++) {
  answerBoxes[i].addEventListener("click", handleAnswerClick)
}
setTimeout(drawStartScreen, 10);
