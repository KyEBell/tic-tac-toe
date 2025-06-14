import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TicTacToeBoard from '../components/TicTacToeBoard';
import { CellValue } from '../types/types';

describe('TicTacToeBoard', () => {
  it('renders X and O in the correct cells', () => {
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
    const { getAllByText } = render(
      <TicTacToeBoard board={board} onCellPress={() => {}} />
    );

    expect(getAllByText('X').length).toBe(1);
    expect(getAllByText('O').length).toBe(1);
  });

  it('calls onCellPress when a cell is pressed', () => {
    const mockPress = jest.fn();
    const board: CellValue[] = Array(9).fill(null);
    const { getAllByText } = render(
      <TicTacToeBoard board={board} onCellPress={mockPress} />
    );

    const emptyCells = getAllByText('');
    fireEvent.press(emptyCells[0]);

    expect(mockPress).toHaveBeenCalled();
  });
});
