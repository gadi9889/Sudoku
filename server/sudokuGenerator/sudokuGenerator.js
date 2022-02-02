let sudokuMatrix = [
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], //1-9
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let counterToRowDelete = 0;
const rowColLength = 9
const maxRandomAttempt = 40

function generateBoard() {
    let counterToBoardDelete = 0 
    for (let row = 0; row < rowColLength; row++) {
        for (let col = 0; col < rowColLength; col++) {
        if (!findNumber(row, col, Math.floor(Math.random() * rowColLength) + 1)) {
            col = -1;
            counterToBoardDelete++;
            if (counterToBoardDelete > maxRandomAttempt) {
            counterToBoardDelete = 0;
            sudokuMatrix = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
            ];
            row = 0;
            }
        }
        }
    }
}

function findNumber(row, col, ranVal) {
    if (checkRow(row, col, ranVal)) {
        sudokuMatrix[row][col] = ranVal;
        return true;
    }
    counterToRowDelete += 1; // the first run the number is repeted
    if (counterToRowDelete > maxRandomAttempt) {
        counterToRowDelete = 0;
        deleteRow(row, col);
        return false;
    }
    return findNumber(row, col, Math.floor(Math.random() * 9) + 1);
}

function checkRow(row, col, ranVal) {
    for (let i = 0; i <= col; i++) {
        if (sudokuMatrix[row][i] == ranVal) {
        return false;
        }
    }
    return checkCol(row, col, ranVal);
    }

    function checkCol(row, col, ranVal) {
    for (let i = 0; i <= row; i++) {
        if (sudokuMatrix[i][col] == ranVal) {
        return false;
        }
    }
    return checkCube(row, col, ranVal);
}

function checkCube(row, col, ranVal) {
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);

    for (let i = startRow; i <= startRow + 2; i++) {
        for (let j = startCol; j <= startCol + 2; j++) {
        if (sudokuMatrix[i][j] == ranVal) {
            return false;
        }
        }
    }

    return true;
}
  
function deleteRow(row, col) {
    for (let i = 0; i <= col; i++) {
        sudokuMatrix[row][i] = 0;
    }
}

generateBoard()

module.exports.displayGrid = function (difficulty,sudokuArray,posArray) {
    let tmpSudokuArray = [...sudokuArray]
    for (let i = 0; i < 36; i = i+parseInt(difficulty)) {
        tmpSudokuArray[posArray[i]] = 0
    }
    return tmpSudokuArray
}
module.exports.fullGrid = sudokuMatrix.flat()