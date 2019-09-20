import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PositionScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textOneStyle}>Child #1</Text>
      <Text style={styles.textTwoStyle}>Child #2</Text>
      <Text style={styles.textThreeStyle}>Child #3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 3,
    borderColor: 'black',
    height: 200
  },
  textOneStyle: {
    padding: 3,
    borderWidth: 3,
    borderColor: 'red'
  },
  textTwoStyle: {
    padding: 3,
    borderWidth: 3,
    borderColor: 'blue',
    position: 'absolute',
    ...StyleSheet.absoluteFillObject
  },
  textThreeStyle: {
    padding: 3,
    borderWidth: 3,
    borderColor: 'green'
  }
});

export default PositionScreen;