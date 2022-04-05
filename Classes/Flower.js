let LivingCreature = require('./LivingCreature')
module.exports = class Flower extends LivingCreature {
    mul() {

        this.multiply++
        let arr = this.chooseCell(0)
        let emptyCell = arr[Math.floor(Math.random() * arr.length)]

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