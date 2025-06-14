import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GameOverModal from '../components/GameOverModal';

describe('GameOverModal', () => {
  it('renders winner text correctly', () => {
    const { getByText } = render(
      <GameOverModal
        visible={true}
        winner='X'
        onReset={jest.fn()}
        onDismiss={jest.fn()}
      />
    );

    expect(getByText('X wins!')).toBeTruthy();
  });

  it('calls onReset when Play Again is pressed', () => {
    const mockReset = jest.fn();

    const { getByText } = render(
      <GameOverModal
        visible={true}
        winner='O'
        onReset={mockReset}
        onDismiss={jest.fn()}
      />
    );

    fireEvent.press(getByText('Play Again'));

    expect(mockReset).toHaveBeenCalled();
  });

  it('does not render modal if winner is null', () => {
    const { queryByText } = render(
      <GameOverModal
        visible={true}
        winner={null}
        onReset={jest.fn()}
        onDismiss={jest.fn()}
      />
    );

    expect(queryByText('Play Again')).toBeNull();
  });
});
