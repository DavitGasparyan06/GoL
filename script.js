matrix = []

function generateMatrix(side, GrassCount, GrassEaterCount, PredatorCount , OmnivorousCount,FlowerCount){
    
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
            let gr = new Grass(x,y)
            grassArr.push(gr)
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Eater(x,y)
            eaterArr.push(Xt)
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < PredatorCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Xt = new Predator(x,y)
            predatorArr.push(Xt)
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < OmnivorousCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let Om = new Omnivorous(x,y)
            omnivorousArr.push(Om)
            matrix[y][x] = 4;
        }
    }
    for (let i = 0; i < FlowerCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        if (matrix[y][x] == 0) {
            let fl = new Flower(x,y)
            flowerArr.push(fl)
            matrix[y][x] = 5;
        }
    }
}

var side  = 12;

var grassArr = []
var eaterArr = []
var predatorArr = []
var omnivorousArr = []
var flowerArr = []

 function setup(){
    generateMatrix(60,200,20,30,10,4)
    createCanvas(matrix.length * side, matrix[0].length * side)
    stroke(180, 180, 180)
    frameRate(30)
}
function draw(){
    console.log(grassArr.length);
    console.log(eaterArr.length);
    console.log(predatorArr.length);
    console.log(omnivorousArr.length);
    console.log(flowerArr.length);
    console.log("---------------");
    
    
    for(var y = 0; y < matrix.length; y++){
        for(var x = 0; x < matrix[y].length ; x++){
            
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }else if (matrix[y][x] == 2) {
                fill("yellow");
            }else if (matrix[y][x] == 3){
                fill("red");
            }else if (matrix[y][x] == 4 ){
                fill('orange')
            }else if (matrix[y][x] == 5 ){
                fill('pink')
            }
 
            rect(side*x, side*y, side , side)
            
        }
    }

    for(let i in grassArr){
        grassArr[i].mul()
    }
    for(let i in eaterArr){
        eaterArr[i].move()
    }
    for(let i in predatorArr){
        predatorArr[i].move()
    }
    for(let i in omnivorousArr){
        omnivorousArr[i].move()
    }
    for(let i in flowerArr){
        flowerArr[i].mul()
    }
}