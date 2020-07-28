import { isFinished, Players, Matrix } from './utils'

console.log(isFinished([
    [ -1, 1, 1 ],
    [ 1, -1, 0 ],
    [ 0, 0, -1 ],
]))

export default class Player {
    
    constructor (public board: Matrix< number >) {}

    play (controller) {

        let bestScore = -Infinity
        let move = { row : 0, column : 0 }

        for ( let row = 0; row < 3; row += 1 ) {

            for ( let column = 0; column < 3; column += 1 ) {

                if ( this.board[row][column] == 0 ) {

                    let score = minimax(this.board, 0, true)
                    
                    if ( score > bestScore ) {
                        move = { row, column }
                        bestScore = score
                    }
                    
                }

            }

        }

        controller(move.row, move.column)

    }

}


function evaluate ( board: Matrix< number > ) {
    const $isFinished = isFinished(board)

    if ( $isFinished ) {
        // If Game is finish and there is winner return score of it 10 of -10
        if ( typeof $isFinished !== 'boolean' ) return $isFinished.winner === Players.GREEN ? 10 : -10

        // If Game is tieing return score 0
        return 0
    }

    return null
}

function minimax ( board: Matrix< number >, depth: number, isMax: boolean ) {

    // Get Score of move by passing screenshot from board
    const score = evaluate( board )

    if ( score !== null ) return score - depth

    if ( isMax ) {

        let bestScore = -Infinity

        for ( let row = 0; row < 3; row += 1 ) {

            for ( let column = 0; column < 3; column += 1 ) {

                // IF Spot is Available
                if ( board[row][column] === 0 ) {

                    board[row][column] = Players.GREEN

                    bestScore = Math.max( bestScore, minimax( board, depth + 1, false ) )

                    board[row][column] = 0;
                    
                }

            }

        }

        return bestScore

    } else {

        let bestScore = Infinity

        for ( let row = 0; row < 3; row += 1 ) {

            for ( let column = 0; column < 3; column += 1 ) {

                // IF Spot is Available
                if ( board[row][column] === 0 ) {
                    
                    board[row][column] = Players.BLUE;
                    
                    bestScore = Math.min( bestScore, minimax( board, depth + 1, true ) )

                    board[row][column] = 0

                }

            }

        }

        return bestScore;

    }

}