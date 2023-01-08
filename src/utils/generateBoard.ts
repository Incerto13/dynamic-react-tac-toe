

export const generateBoard = (gridSize: number) => {
    const board = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        board[i] = new Array(gridSize).fill("")
    }
    return board;
}