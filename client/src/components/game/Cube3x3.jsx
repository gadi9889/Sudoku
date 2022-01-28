import React from 'react';

export default function Cube3x3({ id }) {
    console.log(id)
    const cubeMaker = (id) => {
        let cellList = []
        let rowStart = startingRow(id)
        let colStart = startingCol(id)
        let cells = 1
        return cellSetter(colStart,rowStart,cells,cellList)
    }

    const startingRow = (id) => {
        if (id<3) {
            return +0
        }
        return startingRow(id/2) + 27
    }

    const startingCol = (id) => {
        return (id%3)*3
    }

    const cellSetter = (colStart,rowStart,cells,cellList) => {
        cellList[cells-1] = <input type="number" name={'cell-'+(cells+colStart+rowStart)} id={(colStart+cells+rowStart)} />
        console.log(cells)
        if (cells == 9) {
            console.log(cells)
            return cellList
        }
        if (cells%3 == 0) {
            return cellSetter(colStart,rowStart+6,cells+1,cellList)
        }
        return cellSetter(colStart,rowStart,cells+1,cellList)
    }

    let cellList = cubeMaker(id)
    return (
        <div id={id}>
            {cellList.map((cell) => {
                return cell
            })}
        </div>
    )
}
