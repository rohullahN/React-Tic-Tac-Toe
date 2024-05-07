import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
function App() {
  const [player, setPlayer] = useState(1);
  function handleChangePlayer() {
    setPlayer((prev) => (prev === 1 ? 2 : 1));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            classes={player === 1 ? "active" : undefined}
          />
          <Player
            name="Player 2"
            symbol="O"
            classes={player === 2 ? "active" : undefined}
          />
        </ol>
        <Gameboard player={player} handleChangePlayer={handleChangePlayer} />
      </div>
    </main>
  );
}

export default App;
