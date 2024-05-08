import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./WinningCombinations.js";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getCurrentPlayer(currentGameState) {
  let currentPlayer = "X";

  if (currentGameState.length > 0 && currentGameState[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = getCurrentPlayer(gameTurns);

  let gameBoard = JSON.parse(JSON.stringify(initialGameboard));

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare == secondSquare &&
      firstSquare == thirdSquare
    ) {
      winner = firstSquare;
    }
  }
  const hasDraw = !winner && gameTurns.length === 9;

  function handleChangePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = getCurrentPlayer(gameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function restartGame() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            classes={currentPlayer === "X" ? "active" : undefined}
          />
          <Player
            name="Player 2"
            symbol="O"
            classes={currentPlayer === "O" ? "active" : undefined}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restart={restartGame} />
        )}
        <Gameboard board={gameBoard} handleChangePlayer={handleChangePlayer} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
