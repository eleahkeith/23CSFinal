var canvas = document.querySelector("#screen")
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");

var maxheight = canvas.height*0.3;

var maze = [
  [5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,0,0,0,0,0,0,0,5,0,1,0,0,0,0,0,5],
  [5,5,5,5,0,5,0,5,5,0,3,3,3,0,3,1,5],
  [5,1,5,0,0,5,0,0,0,0,2,2,2,2,3,3,3],
  [5,0,5,0,3,3,3,3,3,0,2,3,3,2,2,2,2],
  [5,0,0,0,3,2,2,2,2,0,2,3,0,1,3,3,3],
  [3,3,3,0,3,2,3,1,2,2,2,3,0,4,4,0,4],
  [2,2,2,2,2,2,3,0,3,3,3,0,0,4,1,0,4],
  [3,3,3,1,3,3,3,0,0,0,4,0,4,4,4,0,4],
  [4,0,0,0,4,0,4,0,4,0,4,0,4,0,0,0,4],
  [4,0,4,4,4,0,0,0,4,0,0,0,4,4,4,0,4],
  [4,0,0,0,0,0,4,0,4,1,4,0,0,0,0,0,4],
  [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,4],
]

for(var y = 0; y < maze.length; y++) {
  for(var x = 0; x < maze[y].length; x++)
  {
    if(maze[y][x] === 1) {
        ctx.drawImage(starimage, x*20, y*20, 20, 20);
    }
    if (maze[y][x] === 2) {
      ctx.fillStyle="blue";
      ctx.fillRect (x*20, y*20, 20, 20);
    }
    if (maze[y][x] === 3) {
      ctx.drawImage(treeimage, x*20, y*20, 20, 20);
    }
    if (maze[y][x] === 4) {
      ctx.drawImage(houseimage, x*20, y*20, 20, 20);
    }
    if (maze[y][x] === 5) {
      ctx.drawImage(cityimage, x*20, y*20, 20, 20);
    }
  }
}
