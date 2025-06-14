import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import TicTacToeBoard from './components/TicTacToeBoard';
import { CellValue } from './types/types';
import { getBestMove, checkWinner } from './utils/gameLogic';

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
    setShowEndGameModal(false);
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
      }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#00ffe7',
        }}>
        Tic-Tac-Toe
      </Text>

      <TicTacToeBoard board={board} onCellPress={handleCellPress} />

      <Modal visible={showEndGameModal} transparent animationType='fade'>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {winner && (
            <View
              style={{
                backgroundColor: '#222',
                padding: 30,
                borderRadius: 12,
                alignItems: 'center',
                borderColor: '#00ffe7',
              }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  color:
                    winner === 'X'
                      ? '#ff4d4d'
                      : winner === 'O'
                      ? '#b388ff'
                      : '#00ffe7',
                  textShadowColor:
                    winner === 'X'
                      ? '#ff1a1a'
                      : winner === 'O'
                      ? '#b388ff'
                      : '#00ffe7',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 4,
                }}>
                {winner === 'draw' ? 'Draw!' : `${winner} wins!`}
              </Text>
              <TouchableOpacity
                onPress={resetGame}
                style={{
                  backgroundColor: '#00ffe7',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  shadowColor: '#00ffe7',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                }}>
                <Text style={{ color: '#121212', fontSize: 20 }}>
                  Play Again
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
