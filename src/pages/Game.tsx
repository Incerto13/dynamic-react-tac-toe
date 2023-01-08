import React from 'react';
import Square from "../components/Square";

interface Props {
  board: string[][];
  handleClick(row: number, col: number): void;
  gridSize: number;
}
const Game = (props: Props) => {
  const { board, handleClick, gridSize } = props;
    
  const styles = {
    board: {
      display: "grid",
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      gridTemplateRows:  `repeat(${gridSize}, 1fr)`,
      width: "30px"
    }
  };
  return (
    <div style={styles.board}>
      {board.map((row, rowIdx) => {
        return (
          row.map((value, columnIdx: number) => {
              return (
                <Square
                  key={`${rowIdx}-${columnIdx}`}
                  value={[value]}
                  index={columnIdx}
                  handleClick={() => handleClick(rowIdx, columnIdx)}
                />
            )}) 
        )
      })}
    </div>
  );
};
export default Game;