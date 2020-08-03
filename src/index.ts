import Ai from './ai'
import { Matrix, Players, isFinished, Observer, displayMatrix } from './utils'

class TicToc extends Observer {
  Matrix: Matrix<number> = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  Grid: Element[] = Array.from(document.getElementsByClassName("box"));

  currentPlayer: Players = Players.BLUE;

  colors: { [Players.BLUE]: string; [Players.GREEN]: string } = {
    [Players.BLUE]: "blue",
    [Players.GREEN]: "green",
  };

  constructor() {
    super();
    
    this.Grid.forEach((box) => {
      
      box.addEventListener("click", () => {
        // prevent user from click on the same time when ai thinking
        if ( this.currentPlayer !== Players.BLUE ) return
        
        const row = Number(box.getAttribute("data-row"));
        
        const col = Number(box.getAttribute("data-col"));
        
        this.play(row, col);
        
        let ai = new Ai(this.Matrix);

        ai.play((row, col) => this.play(row, col))

      });

    });
  }

  updateView() {
    this.Grid.forEach((box) => {
      const row = Number(box.getAttribute("data-row"));
      const col = Number(box.getAttribute("data-col"));
      const feild: string = this.Matrix[row][col].toString()

      if ( this.Matrix[row][col] !== 0 ) box.classList.add(this.colors[feild]);
      else
        box.classList.remove(
          this.colors[Players.GREEN],
          this.colors[Players.BLUE]
        );
    });
  }

  play(row: number, col: number) {
    if ( isFinished(this.Matrix) ) return console.log(`Game is finished`);
    
    // is patch available play on it
    if ( this.Matrix[row][col] !== 0 && row >= 3 && col >= 3 ) return;

    this.Matrix[row][col] = this.currentPlayer;

    // Toggle Current Player
    this.currentPlayer =
      this.currentPlayer === Players.GREEN ? Players.BLUE : Players.GREEN;
      
    this.updateView();
      
    // fire event with array matrix, row and column
    this.fire(this.Matrix, { row, col });
  }

}

const tictoc = new TicToc();
const result = document.getElementById('result')
const reset = document.getElementById('reset')

tictoc.listen(() => {

    displayMatrix(tictoc.Matrix);

    console.log(isFinished(tictoc.Matrix));

    if ( isFinished(tictoc.Matrix) ) {
        result.innerText = `${ ( tictoc.currentPlayer === Players.GREEN ) ? 'blue' : 'green' } player is winner`
    }

})

reset.addEventListener('click', () => {
    tictoc.Matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    tictoc.updateView()
    result.innerText = ''
    tictoc.currentPlayer = Players.BLUE
})