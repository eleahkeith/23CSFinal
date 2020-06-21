// BURGER MENU
const navItems = document.querySelector("nav ul");
const burgerIcon = document.querySelector(".burger-icon");

function toggleBurgerMenu(icon) {
  icon.classList.toggle("transform");
  navItems.classList.toggle("burger-open");
}

burgerIcon.addEventListener("click", function(){toggleBurgerMenu(this)});

// MAZE
const canvas = document.querySelector("#screen")
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");

const starimage = document.querySelector("#starimage");
const treeimage = document.querySelector("#treeimage");
const houseimage = document.querySelector("#houseimage");
const cityimage = document.querySelector("#cityimage");
const trophyimage = document.querySelector("#trophyimage");

var boxSize = canvas.width/20;

var maze = [
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
  [4,4,4,0,4,0,0,4,0,4,0,4,0,0,0,3,3,3,3,3],
  [4,0,0,1,4,0,4,0,0,4,0,4,0,3,0,4,0,0,3,3],
  [4,0,4,0,4,0,4,4,4,1,0,4,1,0,0,3,3,0,0,0],
  [4,0,4,0,4,0,3,0,0,0,3,3,0,4,0,0,0,0,3,0],
  [4,1,4,0,0,1,4,4,4,0,0,0,0,3,3,3,3,0,3,3]
]

for (var y = 0; y < maze.length; y++) {
  for (var x = 0; x < maze[y].length; x++) {
    if (maze[y][x] === 1) {
      ctx.drawImage(starimage, x * boxSize, y * boxSize, boxSize, boxSize);
    } else if (maze[y][x] === 2) {
      ctx.fillStyle = "blue";
      ctx.fillRect (x * boxSize, y * boxSize, boxSize, boxSize);
    } else if (maze[y][x] === 3) {
      ctx.drawImage(treeimage, x * boxSize, y * boxSize, boxSize, boxSize);
    } else if (maze[y][x] === 4) {
      ctx.drawImage(houseimage, x * boxSize, y * boxSize, boxSize, boxSize);
    } else if (maze[y][x] === 5) {
      ctx.drawImage(cityimage, x * boxSize, y * boxSize, boxSize, boxSize);
    } else if (maze[y][x] === 6) {
      ctx.drawImage(trophyimage, x * boxSize, y * boxSize, boxSize, boxSize);
    } else if (maze[y][x] === 7) {
      ctx.fillStyle = "brown";
      ctx.fillRect (x * boxSize, y * boxSize, boxSize, boxSize);
    }
  }
}
