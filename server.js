const { log } = require("console");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});

server.listen(3000, () => {
  console.log("connected");
});
matrix = [];
grassArr = [];
eaterArr = [];
predatorArr = [];
omnivorousArr = [];
flowerArr = [];
function generateMatrix(
  side,
  GrassCount,
  GrassEaterCount,
  PredatorCount,
  OmnivorousCount,
  FlowerCount
) {
  for (let i = 0; i < side; i++) {
    let arr = [];
    matrix.push(arr);
    for (let j = 0; j < side; j++) {
      matrix[i].push(0);
    }
  }
  for (let i = 0; i < GrassCount; i++) {
    let x = Math.floor(Math.random() * side);
    let y = Math.floor(Math.random() * side);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
    }
  }
  for (let i = 0; i < GrassEaterCount; i++) {
    let x = Math.floor(Math.random() * side);
    let y = Math.floor(Math.random() * side);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
    }
  }
  for (let i = 0; i < PredatorCount; i++) {
    let x = Math.floor(Math.random() * side);
    let y = Math.floor(Math.random() * side);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
    }
  }
  for (let i = 0; i < OmnivorousCount; i++) {
    let x = Math.floor(Math.random() * side);
    let y = Math.floor(Math.random() * side);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 4;
    }
  }
  for (let i = 0; i < FlowerCount; i++) {
    let x = Math.floor(Math.random() * side);
    let y = Math.floor(Math.random() * side);

    if (matrix[y][x] == 0) {
      matrix[y][x] = 5;
    }
  }
  return matrix;
}

io.sockets.emit("send matrix", generateMatrix(60, 200, 20, 30, 10, 4));

/////////required
weath = "winter";
Grass = require("./Classes/Grass");
Eater = require("./Classes/GrassEater");
Predator = require("./Classes/Predator");
Omnivorous = require("./Classes/Omnivorous");
Flower = require("./Classes/Flower");
//////////

function create(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        let eat = new Eater(x, y);
        eaterArr.push(eat);
      } else if (matrix[y][x] == 3) {
        let pr = new Predator(x, y);
        predatorArr.push(pr);
      } else if (matrix[y][x] == 4) {
        let Om = new Omnivorous(x, y);
        omnivorousArr.push(Om);
      } else if (matrix[y][x] == 5) {
        let fl = new Flower(x, y);
        flowerArr.push(fl);
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function game() {
  for (let i in grassArr) {
    grassArr[i].mul();
  }
  for (let i in eaterArr) {
    eaterArr[i].eat();
  }
  for (let i in predatorArr) {
    predatorArr[i].eat();
  }
  for (let i in omnivorousArr) {
    omnivorousArr[i].eat();
  }
  for (let i in flowerArr) {
    flowerArr[i].mul();
  }
  io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000);

function kill() {
  grassArr = [];
  eaterArr = [];
  predatorArr = [];
  omnivorousArr = [];
  flowerArr = [];

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addGrass() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
      var gr = new Grass(x, y, 1);
      grassArr.push(gr);
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
  for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2
      var eat = new Eater(x, y, 2)
      eaterArr.push(eat)
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addPredator() {
  for (var i = 0; i < 3; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3
      pr = new Predator(x, y, 3)
      predatorArr.push(pr)
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addOmnivorous() {
  for (var i = 0; i < 2; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 4
      omnivorousArr.push(new Omnivorous(x, y, 4))
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addFlower() {
  for (var i = 0; i < 10; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5
      flowerArr.push(new Flower(x, y, 5))
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function weather() {
  if (weath == "winter") {
    weath = "spring";
  } else if (weath == "spring") {
    weath = "summer";
  } else if (weath == "summer") {
    weath = "autumn";
  } else if (weath == "autumn") {
    weath = "winter";
  }
  io.sockets.emit("weather", weath);
}
setInterval(weather, 5000);

io.on("connection", function (socket) {
  create(matrix);
  socket.on("kill", kill);
  socket.on("add grass", addGrass);
  socket.on("add eater", addGrassEater);
  socket.on("add predator", addPredator);
  socket.on("add omnivorous", addOmnivorous);
  socket.on("add flower", addFlower);
});

var statistics = {};

setInterval(function () {
  statistics.grass = grassArr.length;
  statistics.grassEater = eaterArr.length;
  statistics.predator = predatorArr.length;
  statistics.omnivorous = omnivorousArr.length;
  statistics.flower = flowerArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    // console.log("send")
  });
}, 1000);




