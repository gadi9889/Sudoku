let blankedPositions = () => {
    let array = []
    let rowColLength = 9
    let blankedInRow = 4
    for (let i = 0; i < rowColLength; i++) {
        for (let j = 0; j < blankedInRow; j++) {
            let ranVal = Math.floor(Math.random()*9)
            let posChange = ranVal+(i)*9
            array.push(posChange)
        }
    }
    return array
}

module.exports.blankedPositionsArray = function() {
    return blankedPositions()
}