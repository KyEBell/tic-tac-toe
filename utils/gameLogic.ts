import { CellValue } from '../types/types';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Finds a move where the CPU ('O') can win by completing a line of 3, and returns that board index if available.
export function getBestMove(board: CellValue[]): number | null {
  for (const [a, b, c] of winningCombinations) {
    const values = [board[a], board[b], board[c]];
    if (values.filter((v) => v === 'O').length === 2 && values.includes(null)) {
      return [a, b, c].find((i) => board[i] === null) ?? null;
    }
  }

  // Loops through all winning lines to see if the player ('X') is about to win, and returns the spot the CPU should block.
  for (const [a, b, c] of winningCombinations) {
    const values = [board[a], board[b], board[c]];
    if (values.filter((v) => v === 'X').length === 2 && values.includes(null)) {
      return [a, b, c].find((i) => board[i] === null) ?? null;
    }
  }

  // Picks a random empty square on the board if there's no winning or blocking move.
  const emptyIndexes = board
    .map((v, i) => (v === null ? i : null))
    .filter((i) => i !== null) as number[];
  if (emptyIndexes.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
  return emptyIndexes[randomIndex];
}

export function checkWinner(board: CellValue[]): CellValue | 'draw' | null {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  if (board.every((cell) => cell !== null)) {
    return 'draw';
  }

  return null;
}
