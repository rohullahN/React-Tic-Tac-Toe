export default function Log({ turns }) {
  return (
    <>
      <ul id="log">
        {turns.map((turn) => (
          <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player}, {turn.square.row}:{turn.square.col}
          </li>
        ))}
      </ul>
    </>
  );
}
