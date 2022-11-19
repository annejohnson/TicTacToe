import React from 'react';

const numberOfTicTacToeSquaresPerRow: number = 3;
const totalNumberOfTicTacToeSquares: number = numberOfTicTacToeSquaresPerRow ** 2;

enum Player {
  X = 1,
  O
}

// TODO:
// - Handle draws
// - Add fancy styles to the winning row/column/diagonal

interface TicTacToeProps {}

interface TicTacToeState {
  currentPlayer: Player;
  squares: Array<Player | null>;
  winner: Player | null;
}

const Instruction: React.FunctionComponent<
  { currentPlayer: Player }
> = ({ currentPlayer }) => {
  return <p>Player {Player[currentPlayer]}, it's your turn. Click on a square.</p>;
};

const arrangeArrayIntoSquare = (arr: Array<unknown>): Array<Array<unknown>> => {
  // TODO: Throw an error if itemsPerRow is not a whole number
  const itemsPerRow = arr.length ** 0.5;
  const rows = [];
  for (let i = 0; i < arr.length; i += itemsPerRow) {
    const row = arr.slice(i, i + itemsPerRow);
    rows.push(row);
  }
  return rows;
};

const GameBoard: React.FunctionComponent<{
  squares: Array<Player | null>,
  onSquareClick: (idx: number) => void
}> = ({ squares, onSquareClick }) => {

  const rowsOfSquares = arrangeArrayIntoSquare(squares);
  const squaresPerRow = rowsOfSquares[0].length;

  return (
    <div className="game-board">
      {rowsOfSquares.map((rowOfSquares, rowIdx) => {
        return (
          <div className="game-board-row" key={rowIdx}>
            {rowOfSquares.map((square, colIdx) => {
              const squareIdx = (rowIdx * squaresPerRow) + colIdx;
              const buttonContent = typeof square === 'number' ? Player[square] : ' ';
              return <button className="game-board-square" onClick={() => onSquareClick(squareIdx)} key={`${rowIdx}-${colIdx}`}>{buttonContent}</button>;
            })}
          </div>
        );
      })}
    </div>
  );
};

const allEqual = (items: Array<any>): boolean => {
  return items.every(item => item === items[0]);
};

export default class TicTacToe extends React.Component<
  TicTacToeProps,
  TicTacToeState
> {
  constructor(props: TicTacToeProps) {
    super(props);
    this.state = {
      currentPlayer: Player.X,
      squares: Array(totalNumberOfTicTacToeSquares).fill(null),
      winner: null
    };
  }

  onNewGameClick() {
    this.setState({
      currentPlayer: Player.X,
      squares: Array(totalNumberOfTicTacToeSquares).fill(null),
      winner: null
    });
  }

  onSquareClick(squareIndex: number) {
    const { currentPlayer, squares, winner } = this.state;

    if (winner) return;
    const squareIndexValid = squareIndex >= 0 && squareIndex <= squares.length - 1;
    if (!squareIndexValid) return;
    if (squares[squareIndex]) return;

    const newSquares = squares.slice();
    newSquares[squareIndex] = currentPlayer;

    this.setState({
      winner: this.checkForWinner(newSquares),
      squares: newSquares,
      currentPlayer: currentPlayer === Player.X ? Player.O : Player.X
    });
  }

  checkForWinner(squares: Array<Player | null>): Player | null {
    const numSquaresPerRow = squares.length ** 0.5;
    const firstDiagonal = [];
    const secondDiagonal = [];
    for (let i = 0; i < numSquaresPerRow; i += 1) {
      // Check ith row
      const row = squares.slice(i * numSquaresPerRow, (i * numSquaresPerRow) + numSquaresPerRow);
      console.log("Checking row: " + JSON.stringify(row));
      if (row[0] && allEqual(row)) {
        console.log("Player " + row[0] + " has won");
        return row[0];
      }

      // Check ith column
      const column = [];
      for (let j = 0; j < numSquaresPerRow; j += 1) {
        column.push(squares[i + (j * numSquaresPerRow)]);
      }
      console.log("Checking column: " + JSON.stringify(column));
      if (column[0] && allEqual(column)) {
        return column[0];
      }

      // 0, 4, 8
      firstDiagonal.push(squares[i * numSquaresPerRow + i]);
      // 2, 4, 6
      secondDiagonal.push(squares[i * numSquaresPerRow + (numSquaresPerRow - i - 1)]);
    }

    console.log("Checking 1st diagonal: " + JSON.stringify(firstDiagonal));
    if (firstDiagonal[0] && allEqual(firstDiagonal)) {
        return firstDiagonal[0];
    }

    console.log("Checking 2nd diagonal: " + JSON.stringify(secondDiagonal));
    if (secondDiagonal[0] && allEqual(secondDiagonal)) {
        return secondDiagonal[0];
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.state.winner ? (
          <p>Congrats, Player {Player[this.state.winner]}. You've won!</p>
        ) : (
          <Instruction currentPlayer={this.state.currentPlayer} />
        )}

        <GameBoard squares={this.state.squares} onSquareClick={(idx) => this.onSquareClick(idx)} />

        <button className="new-game-button" onClick={() => this.onNewGameClick()} disabled={!this.state.winner}>Start a new game</button>
      </div>
    );
  }
}
