export type Matrix<T> = Array< Array< T > >

interface IObserver {
    Observers: Function[]
    fire: (matrix: Matrix<Number>, info: { col: number, row: number }) => void
    listen: (
        observer: (matrix: Matrix<Number>, info : { col: number, row: number }) => void
    ) => void
}

function getAcrossLeft(arr: Matrix< number >) {
    let i = -1;
    return arr.map((row) => {
      i += 1;
      return row[i];
    });
}

function getAcrossRight(arr: Matrix< number >) {
    let i = 3;
    return arr.map((row) => {
        i -= 1;
        return row[i];
    });
}

function getColumn(arr: Matrix< number >, col: number) {
    return arr.map((row) => row[col - 1]);
}


export enum Players {
  GREEN = 1,
  BLUE = -1,
}

export function displayMatrix (matrix: Matrix< number >) {
    let result = ``;
    result += `[ ${matrix[0].join(", ")} ]`;
    result += `\n[ ${matrix[1].join(", ")} ]`;
    result += `\n[ ${matrix[2].join(", ")} ]`;
    console.log(result);
}

export function sum(arr: number[]): number {
  return arr.reduce((i: number, acc: number) => i + acc, 0);
}

export function isFinished(board: Matrix< number >): boolean | { winner : Players } {

    const status = { winner : null }

    const sumColumns = [
        sum( getColumn(board, 0) ),
        sum( getColumn(board, 1) ),
        sum( getColumn(board, 2) ),
    ];
    
    sumColumns.forEach(column => {
        if ( column === Players.GREEN * 3 ) status.winner = Players.GREEN
        if ( column === Players.BLUE * 3 ) status.winner = Players.BLUE
    })

    const sumRows = [
        sum( board[0] ),
        sum( board[1] ),
        sum( board[2] )
    ]
    
    sumRows.forEach(row => {
        if ( row === Players.GREEN * 3 ) status.winner = Players.GREEN
        if ( row === Players.BLUE * 3 ) status.winner = Players.BLUE
    })

    if ( sum( getAcrossLeft(board) ) === Players.GREEN * 3 ) status.winner = Players.GREEN
    if ( sum( getAcrossLeft(board) ) === Players.BLUE * 3 ) status.winner = Players.GREEN
    
    if ( sum( getAcrossRight(board) ) === Players.GREEN * 3 ) status.winner = Players.BLUE
    if ( sum( getAcrossRight(board) ) === Players.BLUE * 3 ) status.winner = Players.BLUE
    
    return ( status.winner !== null ) ? status : false
}

export class Observer implements IObserver {
    Observers: Function[] = []

    fire (...args: any) {
        this.Observers.forEach( o => o(...args) )
    }

    listen (
        observer: ( 
            matrix: Matrix< Number >, info : { col: number, row: number } 
        ) => void) {
        this.Observers.push(observer)
    }
}