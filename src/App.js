import { useState } from "react";
export default function App() {
  


  return <div className="board-container">{renderTiles(9)}</div>;
}

function BoardTile({id}) {
  return <div className="board-tile" onClick={()=>handleClick(id)}>Hello</div>;
}

function handleClick(tile){
  console.log(tile);
}

function renderTiles(count) {
  return Array(count)
    .fill(0)
    .map((v, i) => <BoardTile key={i} id={i}/>);
}