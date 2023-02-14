export default function BoardTile({
  id,
  noTiles,
  usersAnswers,
  answer1,
  answer2,
  handleClick,
  answers,
}) {
  const x = id % Math.sqrt(noTiles);
  const y = Math.floor(id / Math.sqrt(noTiles));
  const divClasses = `board-tile ${
    usersAnswers[y][x] ? "board-tile-correct" : ""
  }`;

  let h1Class;
  if (answer1) {
    if (answer1[0] === x && answer1[1] == y) {
      h1Class = "visible";
    }
  }
  if (answer2) {
    if (answer2[0] === x && answer2[1] == y) {
      h1Class = "visible";
    }
  }
  if (usersAnswers[y][x]) h1Class = "visible";
  
  return (
    <div className={divClasses} onClick={() => handleClick(x, y)}>
      <h2 className={h1Class}>{answers[y][x]}</h2>
    </div>
  );
}
