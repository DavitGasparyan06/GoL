let LivingCreature = require('./LivingCreature')
module.exports = class Grass extends LivingCreature {
    mul() {

        this.multiply++
        let arr = this.chooseCell(0)
        let emptyCell = arr[Math.floor(Math.random() * arr.length)]

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