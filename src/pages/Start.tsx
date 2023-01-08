import React, { useState, useMemo, FormEvent } from "react";

interface Props {
  handleStart(players: string[]): void;
  gridSize: number;
  setGridSize (newGridSize: number): void;
}
const Start = (props: Props) => {
  const { handleStart, gridSize, setGridSize } = props;
    const [players, setPlayers] = useState(["", ""]);
    

  const handleInput = (event: FormEvent<HTMLInputElement>, index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1, event.currentTarget.value);
    setPlayers(newPlayers);
  };
  const canStart = useMemo(
    () => players.every((player) => player && player.length > 0),
    [players]
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canStart) return;
    handleStart(players);
  };
  const handleGridSizeChange = (event: FormEvent<HTMLSelectElement>) => {
    setGridSize(parseInt(event.currentTarget.value))
  }
    
  return (
    <div>
      <h1>React Tic Tac Toe</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="gridSize">Grid Size</label>
                  <select name="gridSize" id="gridSize"
            value={gridSize}
             onChange={(e) => handleGridSizeChange(e)}
        >
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
            </select>  
        </div>
        <div>
          <label htmlFor="player1">Player 1</label>
          <input
            className="name-input"
            type="text"
            value={players[0]}
            onInput={(e) => handleInput(e, 0)}
          />
        </div>
        <div>
          <label htmlFor="player2">Player 2</label>
          <input
            className="name-input"
            type="text"
            value={players[1]}
            onInput={(e) => handleInput(e, 1)}
          />
        </div>
        <div>
          <button className="start-btn" type="submit" disabled={!canStart}>
            Start
          </button>
        </div>
      </form>
    </div>
  );
};
export default Start;