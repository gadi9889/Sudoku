export function checkRow(row, col, ranVal, sudokuMatrix) {
    for (let i = 0; i <= col; i++) {
        if (sudokuMatrix[row][i] == ranVal) {
            return false;
        }
    }
    return checkCol(row, col, ranVal, sudokuMatrix);
}

export function checkCol(row, col, ranVal, sudokuMatrix) {
    for (let i = 0; i <= row; i++) {
        if (sudokuMatrix[i][col] == ranVal) {
            return false;
        }
    }
    return checkCube(row, col, ranVal, sudokuMatrix);
}

export function checkCube(row, col, ranVal, sudokuMatrix) {
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