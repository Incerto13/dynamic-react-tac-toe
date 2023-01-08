
export interface turnCount {
    [key: string]: number;
}

export interface progressCounter {
    [key: string]: turnCount
}

export const InitialCount = ():turnCount => {
    return {
            "X": 0,
            "O": 0
        }
}

export const generateProgressCounters = (gridSize: number) => {
    const rowCount = {} as progressCounter;
    const colCount = {} as progressCounter;
    for (let i = 0; i < gridSize; i++) {
        rowCount[i] = InitialCount();
        colCount[i] = InitialCount();
    }
    return {
        rowCount,
        colCount,
    };
}