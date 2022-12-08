import { useState, useRef, useEffect } from "react";
export default function App() {
  const noTiles = 16;
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [visibilityTimeout, setVisibilityTimeout] = useState(null);
  // array filled with false, values change to true if those tiles have been correctly guessed
  const [usersAnswers, setUsersAnswers] = useState(
    Array(Math.sqrt(noTiles))
      .fill(false)
      .map(() => Array(Math.sqrt(noTiles)).fill(false))
  );

  useEffect(() => {
    console.log("visibilityTimeout:", visibilityTimeout);
  }, [visibilityTimeout]);

  const answers = [
    [0, 1, 2, 3],
    [5, 6, 7, 8],
    [3, 2, 1, 0],
    [8, 7, 6, 5],
  ];

  function BoardTile({ id }) {
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

  function renderTiles(count) {
    return Array(count)
      .fill(0)
      .map((v, i) => <BoardTile key={i} id={i} />);
  }

  function handleClick(x, y) {
    if (visibilityTimeout) {
      return;
    }
    if (!answer1) {
      setAnswer1([x, y]);
    } else {
      // break if choosing same tile
      if (answer1[0] === x && answer1[1] === y) return;
      setAnswer2([x, y]);
    }
  }

  function verifyAnswers() {
    if (answers[answer1[1]][answer1[0]] === answers[answer2[1]][answer2[0]]) {
      console.log(true);
      setUsersAnswers((prev) => {
        prev[answer1[1]][answer1[0]] = true;
        prev[answer2[1]][answer2[0]] = true;
        console.log(prev);
        return prev;
      });
    } else {
      console.log(false);
    }
  }

  useEffect(() => {
    // verify answers once second answer has been set in state
    if (answer2) {
      verifyAnswers();

      setVisibilityTimeout(
        setTimeout(() => {
          setAnswer1(null);
          setAnswer2(null);
          setVisibilityTimeout(null);
        }, 1000)
      );
    }
  }, [answer2]);

  return <div className="board-container">{renderTiles(noTiles)}</div>;
}
