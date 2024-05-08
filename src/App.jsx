import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./WinningCombinations.js";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard, playerNames) {
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
      winner = playerNames[firstSquare];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = JSON.parse(JSON.stringify(INITAL_GAMEBOARD));

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function getCurrentPlayer(currentGameState) {
  let currentPlayer = "X";

  if (currentGameState.length > 0 && currentGameState[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const currentPlayer = getCurrentPlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, playerNames);
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

  function handlePlayerNameChange(symbol, playerName) {
    setPlayerNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: playerName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            classes={currentPlayer === "X" ? "active" : undefined}
            handlePlayerNameChange={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            classes={currentPlayer === "O" ? "active" : undefined}
            handlePlayerNameChange={handlePlayerNameChange}
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
