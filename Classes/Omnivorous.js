let LivingCreature = require('./LivingCreature')
module.exports = class Omnivorous extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 35
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
                this.energy-=2
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 4
                matrix[this.y][this.x] = 0

                this.x = x
                this.y = y
            }else if (this.energy <= 0) {
                this.die()
            }
        }
    eat() {
        this.mul()
        let PredatorCells = this.chooseCell(3)
        let PredatorCell = PredatorCells[Math.floor(Math.random() * PredatorCells.length)];
        let GrassCells = this.chooseCell(1)
        let GrassCell = GrassCells[Math.floor(Math.random() * GrassCells.length)];
        let EaterCells = this.chooseCell(2)
        let EaterCell = EaterCells[Math.floor(Math.random() * EaterCells.length)];
        let FlowerCells = this.chooseCell(5)
        let FlowerCell = FlowerCells[Math.floor(Math.random() * FlowerCells.length)];

        if (PredatorCell && this.energy > 0) {
            if (weath == "winter") {
                this.energy += 5;
            } else if (weath == "spring") {
                this.energy += 15
            } else if (weath == "summer") {
                this.energy += 10
            } else if (weath == "autumn") {
                this.energy += 12
            }
            let newX = PredatorCell[0];
            let newY = PredatorCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
        } else if (EaterCell && this.energy > 0) {
            this.energy += 8;
            let newX = EaterCell[0];
            let newY = EaterCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in eaterArr) {
                if (newX == eaterArr[i].x && newY == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            
        } else if (FlowerCell && this.energy > 0) {
            this.energy += 5;
            let newX = FlowerCell[0];
            let newY = FlowerCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in flowerArr) {
                if (newX == flowerArr[i].x && newY == flowerArr[i].y) {
                    flowerArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            
        } else if (GrassCell && this.energy > 0) {
            this.energy += 2;
            let newX = GrassCell[0];
            let newY = GrassCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in grassArr) {
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
        for (var i in omnivorousArr) {
            if (this.x == omnivorousArr[i].x && this.y == omnivorousArr[i].y) {
                omnivorousArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        let newCells = this.chooseCell(0)
        let newCell = newCells[Math.floor(Math.random() * newCells.length)];

        if (this.energy >= 50 && newCell) {
            var newOmnivorous = new Omnivorous(newCell[0], newCell[1]);
            omnivorousArr.push(newOmnivorous);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 35;
        }
    }
}