import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LayoutExerciseScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.redViewStyle} />
      <View style={styles.blueViewStyle} />
      <View style={styles.greenViewStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: 'center'
  },
  redViewStyle: {
    height: 100,
    width: 100,
    alignSelf: 'flex-start',
    borderWidth: 3,
    borderColor: 'red',
    backgroundColor: 'rgba(255,0,0,0.7)'
  },
  blueViewStyle: {
    height: 100,
    width: 100,
    position: 'absolute',
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderColor: 'blue',
    backgroundColor: 'rgba(0,0,255,0.7)'
  },
  greenViewStyle: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderColor: 'green',
    backgroundColor: 'rgba(0,255,0,0.7)'
  }
});

export default LayoutExerciseScreen;