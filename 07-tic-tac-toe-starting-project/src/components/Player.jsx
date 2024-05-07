import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditting, setIsEditting] = useState(false);

  const handleEditting = () => {
    setIsEditting((prev) => !prev);
  };

  const playerName = isEditting ? (
    <input type="text" required value={name}></input>
  ) : (
    <span className="player-name">{name}</span>
  );

  const buttonText = isEditting ? "Save" : "Edit";

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditting}>{buttonText}</button>
    </li>
  );
}
