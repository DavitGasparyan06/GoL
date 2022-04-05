let LivingCreature = require('./LivingCreature')
module.exports = class Eater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 13
    }

    updateDirection() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch) {
        this.updateDirection()
        return super.chooseCell(ch)
    }

    move() {


        let emptyCells = this.chooseCell(0)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (emptyCell && this.energy > 0) {
            this.energy--
            let x = emptyCell[0]
            let y = emptyCell[1]

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y
        }else if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {
        this.mul()
        let newCells = this.chooseCell(1) // [[1,2] []]
        let newCell = newCells[Math.floor(Math.random() * newCells.length)];
        let flowerCells = this.chooseCell(5)
        let flowerCell = flowerCells[Math.floor(Math.random()* flowerCells.length)];

        if (flowerCell && this.energy > 0) {
            if (weath == "winter") {
                this.energy += 0.5;
            } else if (weath == "spring") {
                this.energy += 2
            } else if (weath == "summer") {
                this.energy += 1.5
            } else if (weath == "autumn") {
                this.energy += 1
            }
            let newX = flowerCell[0];
            let newY = flowerCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (let i in flowerArr) {
                if (newX == flowerArr[i].x && newY == flowerArr[i].y) {
                    flowerArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;

        } else if (newCell && this.energy > 0) {
            this.energy += 1.5;
            let newX = newCell[0];
            let newY = newCell[1];
            
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;

        }else{
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i in eaterArr) {
            if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                eaterArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        let newCells = this.chooseCell(0)
        let newCell = newCells[Math.floor(Math.random() * newCells.length)];

        if (this.energy >= 15 && newCell) {
            let newGrassEater = new Eater(newCell[0], newCell[1]);
            eaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }
}
