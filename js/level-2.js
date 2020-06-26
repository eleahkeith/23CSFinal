var canvas = document.querySelector("#screen")
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");

const boxSize = canvas.width / 20;

var state = {
  question: 0,
  character: {x: boxSize * 15, y: boxSize * 14},
  question1XY: {x: boxSize * 17, y: boxSize * 10},
  question2XY: {x: boxSize * 18, y: boxSize * 2},
  question3XY: {x: boxSize * 15, y: boxSize * 5},
  question4XY: {x: boxSize * 12, y: boxSize * 10},
  question5XY: {x: boxSize * 2, y: boxSize * 13},
  question6XY: {x: boxSize * 3, y: boxSize * 8},
  question7XY: {x: boxSize * 4, y: boxSize * 3},
  question8XY: {x: boxSize * 2, y: boxSize * 2},
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

// Charactor movement
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
// function moveCharacter(question) {
//   if (question === 1) {
//    moveUp(3);
//    moveRight(5);
//  }
// }
//
// // questions
//
//   let question = 1;
//   moveCharacter(question);

// Run game
function runGame() {
  drawMaze();
  drawCharacter();
}

setInterval(runGame, 50)
