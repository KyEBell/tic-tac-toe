import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CellValue } from '../types/types';

interface BoardProps {
  board: CellValue[];
  onCellPress: (index: number) => void;
}

export default function TicTacToeBoard({ board, onCellPress }: BoardProps) {
  return (
    <View
      style={{
        width: 300,
        height: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {board.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: '#00ffe7',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1e1e1e',
          }}
          onPress={() => onCellPress(index)}>
          <Text
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color:
                value === 'X' ? '#ff1a1a' : value === 'O' ? '#b388ff' : '#fff',
              textShadowColor:
                value === 'X'
                  ? '#ff1a1a'
                  : value === 'O'
                  ? '#b388ff'
                  : 'transparent',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 4,
            }}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
