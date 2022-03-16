class LivingCreature {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
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
    chooseCell(character) {
        let found = [];
        for (let i in this.direction) {
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length && matrix[y][x] == character) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i])
                }
            }
        }

        return found;
    }
}
class Grass extends LivingCreature {
    mul() {

        this.multiply++
        let arr = this.chooseCell(0)
        let emptyCell = random(arr)

        if (this.multiply >= 5 && emptyCell) {

            let x = emptyCell[0]
            let y = emptyCell[1]
            matrix[y][x] = 1

            let gr = new Grass(x, y)
            grassArr.push(gr)
            this.multiply = 0
        }

    }

}

class Eater extends LivingCreature {
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
        this.energy--

        if (this.energy >= 15) {
            this.mul()
        }

        let arr = this.chooseCell(1)

        if (arr.length > 0) {
            this.eat()
        }
        else {
            arr = this.chooseCell(0)
            let emptyCell = random(arr)
            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 2
                matrix[this.y][this.x] = 0

                this.x = x
                this.y = y
            }
        }

        if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {
        let newCell = random(this.chooseCell(1));
        let flowerCell = random(this.chooseCell(5))

        if (flowerCell) {
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
            this.energy += 2;
        }
        else if (newCell) {
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
            this.energy += 2;
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
        let newCell = random(this.chooseCell(0));

        if (this.energy >= 15 && newCell) {
            let newGrassEater = new Eater(newCell[0], newCell[1]);
            eaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }
}
class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 60
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
        this.energy--
        let arr = this.chooseCell(2)
        if (arr.length > 0) {
            this.eat()
            if (this.energy >= 65) {
                this.mul()
            }
        }
        else {
            let emptyCell = random(this.chooseCell(0))

            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            } else {
                this.energy += 0.5
            }
            if (this.energy <= 0) {
                this.die()
            }
        }
    }
    eat() {
        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in eaterArr) {
                if (newX == eaterArr[i].x && newY == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 60;
        }
    }

}
class Omnivorous extends LivingCreature {
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
        this.energy--
        let arr = this.chooseCell(2)
        let Grassarr = this.chooseCell(1)
        let Eaterarr = this.chooseCell(2)
        let Predatorarr = this.chooseCell(3)
        let Flowerarr = this.chooseCell(5)
        if (arr.length > 0 || Grassarr.length > 0 || Eaterarr > 0 || Predatorarr > 0 || Flowerarr > 0) {
            this.eat()
            if (this.energy >= 70) {
                this.mul()
            }
        } else {
            arr = this.chooseCell(0)

            let emptyCell = random(arr)

            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 4
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            }
            if (this.energy <= 0) {
                this.die()
            }
        }




    }
    eat() {
        let PredatorCell = random(this.chooseCell(3));
        let GrassCell = random(this.chooseCell(1))
        let EaterCell = random(this.chooseCell(2))
        let FlowerCell = random(this.chooseCell(5))

        if (PredatorCell) {
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
            this.energy += 10;
        } else if (EaterCell) {
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
            this.energy += 8;
        } else if (FlowerCell) {
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
            this.energy += 5;
        } else if (GrassCell) {
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
            this.energy += 2;
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
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newOmnivorous = new Omnivorous(newCell[0], newCell[1]);
            omnivorousArr.push(newOmnivorous);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 35;
        }
    }
}
class Flower extends LivingCreature {
    mul() {

        this.multiply++
        let arr = this.chooseCell(0)
        let emptyCell = random(arr)

        if (this.multiply >= 7 && emptyCell) {
            let x = emptyCell[0]
            let y = emptyCell[1]
            matrix[y][x] = 5

            let fl = new Flower(x, y)
            flowerArr.push(fl)
            this.multiply = 0
        }

    }

}