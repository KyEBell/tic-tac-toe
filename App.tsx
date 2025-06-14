import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import TicTacToeBoard from './components/TicTacToeBoard';
import { CellValue } from './types/types';
import { getBestMove, checkWinner } from './utils/gameLogic';
import GameOverModal from './components/GameOverModal';

export default function App() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<CellValue | 'draw' | null>(null);
  const [showEndGameModal, setShowEndGameModal] = useState<boolean>(false);

  const handleCellPress = (index: number) => {
    if (!isPlayerTurn || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      setShowEndGameModal(true);
      return;
    }

    if (!isPlayerTurn) {
      const timeout = setTimeout(() => {
        const cpuIndex = getBestMove(board);
        if (cpuIndex !== null) {
          const newBoard = [...board];
          newBoard[cpuIndex] = 'O';
          setBoard(newBoard);
        }
        setIsPlayerTurn(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setShowEndGameModal(false);
  };

  const handleModalDismiss = () => {
    setWinner(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>

      <TicTacToeBoard board={board} onCellPress={handleCellPress} />
      <GameOverModal
        visible={showEndGameModal}
        winner={winner}
        onReset={resetGame}
        onDismiss={handleModalDismiss}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00ffe7',
  },
});
