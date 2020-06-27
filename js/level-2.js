var canvas = document.querySelector("#screen")
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");

const boxSize = canvas.width / 20;

var state = {
  question: 1,
  character: { x: boxSize * 15, y: boxSize * 14 },
  question1: { x: boxSize * 17, y: boxSize * 10, question: "Question 1", answers: ["1", "2", "3", "4"], correct: 2 },
  question2: { x: boxSize * 18, y: boxSize * 2, question: "Question 2", answers: ["1", "2", "3", "4"], correct: 1 },
  question3: { x: boxSize * 15, y: boxSize * 5, question: "Question 3", answers: ["1", "2", "3", "4"], correct: 4 },
  question4: { x: boxSize * 12, y: boxSize * 10, question: "Question 4", answers: ["1", "2", "3", "4"], correct: 2 },
  question5: { x: boxSize * 2, y: boxSize * 13, question: "Question 5", answers: ["1", "2", "3", "4"], correct: 3 },
  question6: { x: boxSize * 3, y: boxSize * 8, question: "Question 6", answers: ["1", "2", "3", "4"], correct: 3 },
  question7: { x: boxSize * 4, y: boxSize * 3, question: "Question 7", answers: ["1", "2", "3", "4"], correct: 2 },
  question8: { x: boxSize * 2, y: boxSize * 2, question: "Question 8", answers: ["1", "2", "3", "4"], correct: 4 },
}
// Maze
var maze = [
  [5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
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
  [4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4],
]

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Change var y to var mazeY and var x to var mazeX?
function drawMaze() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var y = 0; y < maze.length; y++) {
    for (var x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 0 || maze[y][x] === 1) {
        ctx.strokeStyle = "#BEBEBE";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
      }
      if (maze[y][x] === 1) {
        ctx.drawImage(starimage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 2) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 3) {
        ctx.drawImage(treeimage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 4) {
        ctx.drawImage(houseimage, x * boxSize, y * boxSize, boxSize, boxSize);
      } else if (maze[y][x] === 5) {
        ctx.drawImage(cityimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
      else if (maze[y][x] === 6) {
        ctx.drawImage(trophyimage, x * boxSize, y * boxSize, boxSize, boxSize);
      }
    }
  }
}

// Charactor and movement
var characterimage = document.querySelector("#characterimage");

function drawCharacter() {
  ctx.drawImage(characterimage, state.character.x, state.character.y, boxSize, boxSize);
}

function moveUp(count) {
  state.character.y = state.character.y - boxSize * count;
}

function moveDown(count) {
  state.character.y = state.character.y + boxSize * count;
}

function moveLeft(count) {
  state.character.x = state.character.x - boxSize * count;
}

function moveRight(count) {
  state.character.x = state.character.x + boxSize * count;
}

// Questions and anwser

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
}

function getQuestion() {
  switch (state.question) {
    case 1:
      setQuestionText(state.question1);
      break;
    case 2:
      setQuestionText(state.question2);
      break;
    case 3:
      setQuestionText(state.question3);
      break;
    case 4:
      setQuestionText(state.question4);
      break;
    case 5:
      setQuestionText(state.question5);
      break;
    case 6:
      setQuestionText(state.question6);
      break;
    case 7:
      setQuestionText(state.question7);
      break;
    case 8:
      setQuestionText(state.question8);
      break;
    default:
      setQuestionText(state.question1);

  }
}

// Run game
function runGame() {
  drawMaze();
  drawCharacter();
  getQuestion();
}

setInterval(runGame, 50);
