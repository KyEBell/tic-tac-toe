import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CellValue } from '../types/types';

type GameOverModalProps = {
  visible: boolean;
  winner: CellValue | 'draw' | null;
  onReset: () => void;
  onDismiss: () => void;
};

export default function GameOverModal({
  visible,
  winner,
  onReset,
  onDismiss,
}: GameOverModalProps) {
  const getColor = () => {
    if (winner === 'X') return '#ff4d4d';
    if (winner === 'O') return '#b388ff';
    return '#00ffe7';
  };

  if (!winner) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onDismiss={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text
            style={[
              styles.winnerText,
              {
                color: getColor(),
                textShadowColor: getColor(),
              },
            ]}>
            {winner === 'draw' ? 'Draw!' : `${winner} wins!`}
          </Text>
          <TouchableOpacity onPress={onReset} style={styles.button}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#00ffe7',
  },
  winnerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: '#00ffe7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#00ffe7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#121212',
    fontSize: 20,
  },
});
