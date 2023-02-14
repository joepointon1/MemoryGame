import { useState, useRef, useEffect } from "react";
import BoardTile from "./components/BoardTile";

export default function App() {
  const noTiles = 16;
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [visibilityTimeout, setVisibilityTimeout] = useState(null);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [correctTilesNo, setCorrectTilesNo] = useState(0);
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [answers, setAnswers] = useState();

  // array filled with false, values change to true if those tiles have been correctly guessed
  const [usersAnswers, setUsersAnswers] = useState(
    Array(Math.sqrt(noTiles))
      .fill(false)
      .map(() => Array(Math.sqrt(noTiles)).fill(false))
  );

  useEffect(() => {
    // console.log("visibilityTimeout:", visibilityTimeout);
  }, [visibilityTimeout]);

  // const answers = [
  //   [0, 1, 2, 3],
  //   [4, 5, 6, 7],
  //   [3, 2, 1, 0],
  //   [7, 6, 5, 4],
  // ];

  useEffect(() => {
    generateAnswers();
  }, []);

  function generateAnswers() {
    let answersArray = [];
    answersArray = Array(Math.sqrt(noTiles))
      .fill("")
      .map(() => Array(Math.sqrt(noTiles)).fill(""));

    const possibleDigits = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
    let randomDigits = [];
    // randomly order numbers
    for (let i = 0; i < noTiles; i++) {
      let digit = Math.floor(Math.random() * (15 - i));
      randomDigits.push(possibleDigits[digit]);
      possibleDigits.splice(digit, 1);
    }

    // put numbers in 2d array
    let counter = 0;
    for (let i = 0; i < Math.sqrt(noTiles); i++) {
      for (let j = 0; j < Math.sqrt(noTiles); j++) {
        answersArray[i][j] = randomDigits[counter];
        counter += 1;
      }
    }
    console.log(answersArray);
    setAnswers(answersArray);
  }

  function renderTiles(count) {
    return Array(count)
      .fill(0)
      .map((v, i) => (
        <BoardTile
          key={i}
          id={i}
          noTiles={noTiles}
          usersAnswers={usersAnswers}
          answer1={answer1}
          answer2={answer2}
          handleClick={handleClick}
          answers={answers}
        />
      ));
  }

  function handleClick(x, y) {
    if (visibilityTimeout) {
      return;
    }
    if (gameOver) {
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
      if (player1Turn) {
        setP1Score((prev) => prev + 1);
      } else {
        setP2Score((prev) => prev + 1);
      }
      setUsersAnswers((prev) => {
        prev[answer1[1]][answer1[0]] = true;
        prev[answer2[1]][answer2[0]] = true;
        console.log(prev);
        return prev;
      });
      setCorrectTilesNo((prev) => (prev += 1));
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    // verify answers once second answer has been set in state
    if (answer2) {
      let correctTurn = verifyAnswers();

      setVisibilityTimeout(
        setTimeout(() => {
          setAnswer1(null);
          setAnswer2(null);
          setVisibilityTimeout(null);
          setPlayer1Turn((prev) => !correctTurn? !prev: prev);
        }, 1000)
      );
    }
  }, [answer2]);

  useEffect(() => {
    // console.log("tiles   :", correctTilesNo);
    if (correctTilesNo * 2 === noTiles) {
      setGameOver(true);
    }
  }, [correctTilesNo]);

  function setHeaderText() {
    return player1Turn ? "Player 1's turn" : "Player 2's turn";
  }

  function setHeaderClass() {
    return player1Turn ? "player-turn p1-colour" : "player-turn p2-colour";
  }

  function setGameOverText() {
    return p1Score === p2Score
      ? "It's a draw"
      : p1Score > p2Score
      ? "!!! Player 1 wins !!!"
      : "!!! Player 2 wins !!!";
  }

  function setGameOverClass() {
    return p1Score === p2Score
      ? "player-turn"
      : p1Score > p2Score
      ? "player-turn p1-colour"
      : "player-turn p2-colour";
  }

  function restartGame() {
    setP1Score(0);
    setP2Score(0);
    setGameOver(false);
    setCorrectTilesNo(0);
    setPlayer1Turn(true);
    setUsersAnswers(
      Array(Math.sqrt(noTiles))
        .fill(false)
        .map(() => Array(Math.sqrt(noTiles)).fill(false))
    );
  }
  return (
    <>
      <div className="title-container">
        <h1>Sqaure Guesser Game</h1>
        {!gameOver && <h3 className={setHeaderClass()}>{setHeaderText()}</h3>}
        {gameOver && (
          <h3 className={setGameOverClass()}>{setGameOverText()}</h3>
        )}
        <div className="score-container">
          <h3 className="p1-colour">P1 Score: {p1Score}</h3>
          <h3 className="p2-colour">P2 Score: {p2Score}</h3>
        </div>
        {gameOver && (
          <>
            <div>Gameover</div> <button onClick={restartGame}>Restart?</button>
          </>
        )}
      </div>
      {answers && <div className="board-container">{renderTiles(noTiles)}</div>}
    </>
  );
}
