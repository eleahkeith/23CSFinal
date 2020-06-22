

var canvas = document.querySelector("#screen");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext("2d");
var body = document.querySelector("body");

var boxSize = canvas.width / 20;

var state = {

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

}

function movePlayer() {

}

drawMaze();
