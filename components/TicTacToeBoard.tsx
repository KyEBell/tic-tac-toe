import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CellValue } from '../types/types';

interface BoardProps {
  board: CellValue[];
  onCellPress: (index: number) => void;
}

export default function TicTacToeBoard({ board, onCellPress }: BoardProps) {
  return (
    <View style={styles.board}>
      {board.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cell}
          onPress={() => onCellPress(index)}>
          <Text
            style={[
              styles.cellText,
              value === 'X'
                ? styles.xText
                : value === 'O'
                ? styles.oText
                : null,
            ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#00ffe7',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  xText: {
    color: '#ff1a1a',
    textShadowColor: '#ff1a1a',
  },
  oText: {
    color: '#b388ff',
    textShadowColor: '#b388ff',
  },
});
