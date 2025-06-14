import { getBestMove, checkWinner } from '../utils/gameLogic';
import { CellValue } from '../types/types';

describe('getBestMove', () => {
  it('returns winning move for CPU', () => {
    const board: CellValue[] = [
      'O',
      'O',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    expect(getBestMove(board)).toBe(2);
  });

  it('blocks player win', () => {
    const board: CellValue[] = [
      'X',
      'X',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    expect(getBestMove(board)).toBe(2);
  });

  it('returns a valid index for random move', () => {
    const board: CellValue[] = [
      'X',
      null,
      'O',
      null,
      'X',
      null,
      'O',
      null,
      null,
    ];
    const move = getBestMove(board);
    expect(move).not.toBeNull();
    expect(board[move!]).toBeNull();
  });

  it('returns null when board is full', () => {
    const board: CellValue[] = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
    expect(getBestMove(board)).toBeNull();
  });
});

describe('checkWinner', () => {
  it('detects X win', () => {
    const board: CellValue[] = [
      'X',
      'X',
      'X',
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    expect(checkWinner(board)).toBe('X');
  });

  it('detects O win', () => {
    const board: CellValue[] = [
      'O',
      null,
      null,
      'O',
      null,
      null,
      'O',
      null,
      null,
    ];
    expect(checkWinner(board)).toBe('O');
  });

  it('detects draw', () => {
    const board: CellValue[] = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(checkWinner(board)).toBe('draw');
  });

  it('returns null for no winner yet', () => {
    const board: CellValue[] = [
      'X',
      'O',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    expect(checkWinner(board)).toBeNull();
  });
});
