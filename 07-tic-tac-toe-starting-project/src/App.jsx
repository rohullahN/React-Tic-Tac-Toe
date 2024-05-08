import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";

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
        <Gameboard turns={gameTurns} handleChangePlayer={handleChangePlayer} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
