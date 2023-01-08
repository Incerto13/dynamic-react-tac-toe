
import React from 'react';
import Game from "./pages/Game";
import Start from "./pages/Start";
import Finished from "./pages/Finished";
import useTickTackToe from "./hooks/useTicTacToe";

export interface GameProps {
  gridSize: number;
  setGridSize: (newSize: number) => void;
}

const App = () => {
  const game = useTickTackToe();
  
  return (
    <div className="App">
      {game.status === "created" &&
        <Start handleStart={game.handleStart} gridSize={game.gridSize} setGridSize={game.setGridSize} />}
      {game.status === "finished" && (
        <Finished name={game.winner} restart={game.handleRestart} />
      )}
      {game.status === "started" && (
        <Game board={game.board} gridSize={game.gridSize} handleClick={game.handleClick} />
      )}
    </div>
  );
};
export default App;