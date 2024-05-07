import { useState } from "react";

export default function Player({ name, symbol, classes }) {
  const [isEditting, setIsEditting] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEditting = () => {
    setIsEditting((prev) => !prev);
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  const editablePlayerName = isEditting ? (
    <input
      type="text"
      required
      value={playerName}
      onChange={handleChange}
    ></input>
  ) : (
    <span className="player-name">{playerName}</span>
  );

  const buttonText = isEditting ? "Save" : "Edit";

  return (
    <li className={classes}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditting}>{buttonText}</button>
    </li>
  );
}
