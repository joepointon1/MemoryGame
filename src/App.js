import { useState, useRef, useEffect } from "react";
export default function App() {
  const noTiles = 16;
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);

  const answers = [
    [0, 1, 2, 3],
    [5, 6, 7, 8],
    [3, 2, 1, 0],
    [8, 7, 6, 5],
  ];

  // array filled with false, values change to true if those tiles have been correctly guessed
  const usersAnswers = Array(Math.sqrt(noTiles))
    .fill(false)
    .map(() => Array(Math.sqrt(noTiles)).fill(false));

  function BoardTile({ id }) {
    const x = id % Math.sqrt(noTiles);
    const y = Math.floor(id / Math.sqrt(noTiles));
    return (
      <div className="board-tile" onClick={() => handleClick(x, y)}>
        {answers[y][x]}
      </div>
    );
  }

  function renderTiles(count) {
    return Array(count)
      .fill(0)
      .map((v, i) => <BoardTile key={i} id={i} />);
  }

  function handleClick(x, y) {
    if (!answer1) {
      setAnswer1([x, y]);
    } else {
      // break if choosing same tile
      if (answer1[0] === x && answer1[1] === y) return;
      setAnswer2([x, y]);
    }
  }

  function verifyAnswers() {
    if(answers[answer1[1]][answer1[0]] === answers[answer2[1]][answer2[0]]){
      console.log(true)
    }else{
      console.log(false);
    } 
    setAnswer1(null);
    setAnswer2(null);
  }


  useEffect(() => {
    // verify answers once second answer has been set in state
    if (answer2) {
      verifyAnswers();
    }
  }, [answer2]);

  return <div className="board-container">{renderTiles(noTiles)}</div>;
}
