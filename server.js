var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

function generateMatrix(side, GrassCount, GrassEaterCount, PredatorCount, OmnivorousCount, FlowerCount) {

    for (let i = 0; i < side; i++) {
        let arr = []
        matrix.push(arr)
        for (let j = 0; j < side; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < GrassCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < PredatorCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < OmnivorousCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }
    for (let i = 0; i < FlowerCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
    return matrix
}

 io.sockets.emit('send matrix', generateMatrix())

 var grassArr = []
var eaterArr = []
var predatorArr = []
var omnivorousArr = []
var flowerArr = []

grass = require("./Grass")
GrassEater = require("./GrassEater")


function create(){

    for (let i = 0; i < GrassCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let gr = new Grass(x, y)
            grassArr.push(gr)
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Eater(x, y)
            eaterArr.push(Xt)
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < PredatorCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Predator(x, y)
            predatorArr.push(Xt)
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < OmnivorousCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Om = new Omnivorous(x, y)
            omnivorousArr.push(Om)
            matrix[y][x] = 4;
        }
    }
    for (let i = 0; i < FlowerCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let fl = new Flower(x, y)
            flowerArr.push(fl)
            matrix[y][x] = 5;
        }
    }
    io.sockets.emit('send matrix', matrix)
}
function game (){
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in eaterArr) {
        eaterArr[i].move()
    }
    for (let i in predatorArr) {
        predatorArr[i].move()
    }
    for (let i in omnivorousArr) {
        omnivorousArr[i].move()
    }
    for (let i in flowerArr) {
        flowerArr[i].mul()
    }
    io.sockets.emit("send matrix", matrix)
}
setInterval(game,1000)
io.on('connection', function(socket){
    create(matrix)
})