import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexBoxScreen = () => {
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
    alignItems: 'center',
    borderColor: 'black',
    height: 200
  },
  textOneStyle: {
    flex: 1,
    padding: 3,
    borderWidth: 3,
    borderColor: 'red'
  },
  textTwoStyle: {
    flex: 2,
    padding: 3,
    borderWidth: 3,
    alignSelf: 'stretch',
    borderColor: 'blue'
  },
  textThreeStyle: {
    flex: 3,
    padding: 3,
    borderWidth: 3,
    borderColor: 'green'
  }
});

export default FlexBoxScreen;