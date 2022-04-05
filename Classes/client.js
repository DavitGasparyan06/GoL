var socket = io();
side = 12;
let weath = "winter";
let headWeath = document.getElementById("weather");
function setup() {
  createCanvas(60 * side, 60 * side);
  stroke(180, 180, 180);
}
socket.on("weather", function (data) {
  weath = data;
});

function drawing(matrix) {
  headWeath.innerHTML = weath;

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 1) {
        if (weath == "summer") {
          fill("green");
        } else if (weath == "autumn") {
          fill("#333300");
        } else if (weath == "winter") {
          fill("white");
        } else if (weath == "spring") {
          fill("#4dffa6");
        }
      } else if (matrix[y][x] == 2) {
        if (weath == "summer" || weath == "spring") {
          fill("yellow");
        } else if (weath == "winter" || weath == "autumn") {
          fill("#a825db")
        }
      } else if (matrix[y][x] == 3) {
        if (weath == "summer" || weath == "spring") {
          fill("red");
        } else if (weath == "winter" || weath == "autumn") {
          fill("#4f120d")
        }
      } else if (matrix[y][x] == 4) {
        fill("orange");
      } else if (matrix[y][x] == 5) {
        if(weath == "spring" || weath == "autumn"){
        fill("#8ee30e");
        }else if(weath == "summer" || weath == "winter "){
          fill("pink")
        }
      }

      rect(side * x, side * y, side, side);
    }
  }
}
socket.on("send matrix", drawing);

function kill() {
  socket.emit("kill");
}
function addGrass() {
  socket.emit("add grass");
}
function addGrassEater() {
  socket.emit("add eater");
}
function addPredator() {
  socket.emit("add predator");
}
function addOmnivorous() {
  socket.emit("add omnivorous");
}
function addFlower() {
  socket.emit("add flower");
}
