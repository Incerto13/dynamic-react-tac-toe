import { useState, useEffect } from "react";
import { generateBoard } from '../utils/generateBoard';
import { generateProgressCounters, InitialCount } from "../utils/generateProgressCounters";

interface ReturnValue {
  board: string[][];
  status: string;
  winner: string | null;
  handleClick: (row: number, col: number) => void;
  handleRestart: () => void;
  handleStart: (players: string[]) => void;
  gridSize: number;
  setGridSize(newGridSize: number): void;
}
export default (): ReturnValue => {
  const [gridSize, setGridSize] = useState(3);
  const [board, setBoard] = useState<string[][]>(generateBoard(gridSize));
  const [turn, setTurn] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState("created");
  const [players, setPlayers] = useState(["", ""]);
  const [rowCount, setRowCount] = useState(generateProgressCounters(gridSize).rowCount);
  const [colCount, setColCount] = useState(generateProgressCounters(gridSize).colCount);
  const [diagCount, setDiagCount] = useState(InitialCount());
  const [antiDiagCount, setAntiDiagCount] = useState(InitialCount());
  const [turnCount, setTurnCount] = useState(0);


  useEffect(() => {
    setTurnCount(turnCount + 1);
    if (winner) {
      setWinner(turn === "X" ? players[0] : players[1]);
      setStatus('finished');
      return;
    }
    if (!winner && turnCount > Math.pow(gridSize, 2)) {
      // tie
      setWinner(null)
      setStatus('finished')
      return;
    }
    }, [board, players, status, winner]);
  
  const handleClick = (row: number, col: number): void => {
    const newBoard = [...board];
    newBoard[row][col] = turn;
    setBoard(newBoard);
    localStorage.setItem('board', JSON.stringify(newBoard));
    updateCounters(row, col);
  };

  const updateCounters = (row: number, col: number): void => {
    const newRowCount = { ...rowCount };
    const newColCount = { ...colCount };
    const newDiagCount = diagCount;
    const newAntiDaigCount = antiDiagCount;
    newRowCount[row][turn]++;
    setRowCount(newRowCount);
    newColCount[col][turn]++;
    setColCount(newColCount);
    if (row + col === gridSize - 1) {
      // diagonal left --> right
      newDiagCount[turn]++;
      setDiagCount(newDiagCount);
    }
    if (row === col) {
      // diagonal right --> left 
      newAntiDaigCount[turn]++;
      setAntiDiagCount(newAntiDaigCount);
    }
    // based on counts determine if the most recent move results in win
    if (newRowCount[row][turn] === gridSize ||
      newColCount[col][turn] === gridSize ||
      newDiagCount[turn] === gridSize
      || newAntiDaigCount[turn] === gridSize
    ) {
      setWinner(turn);
    } else {
      // no winner yet, continue game
      toggleTurn();
    }
  }

  const toggleTurn = (): void => {
    const newTurn = turn === "X" ? "O" : "X";
    setTurn(newTurn);
  }

  const handleStart = (players: string[]) => {
    setPlayers(players); 
    setBoard(generateBoard(gridSize));
    setRowCount(generateProgressCounters(gridSize).rowCount)
    setColCount(generateProgressCounters(gridSize).rowCount)
    setTurn("X");
    setStatus("started");
  };

  const handleRestart = () => {
    setBoard(generateBoard(gridSize));
    setRowCount(generateProgressCounters(gridSize).rowCount)
    setColCount(generateProgressCounters(gridSize).rowCount)
    setDiagCount(InitialCount())
    setAntiDiagCount(InitialCount())
    setTurnCount(0)
    setWinner("");
    setStatus("created");
  };

  return { board, status, winner, handleClick, handleRestart, handleStart, gridSize, setGridSize };
};