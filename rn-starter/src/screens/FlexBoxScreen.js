import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexBoxScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Box Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 3,
    borderColor: 'black'
  },
  textStyle: {
    borderWidth: 2,
    borderColor: 'red',
    marginVertical: 20,
    marginHorizontal: 20
  }
});

export default FlexBoxScreen;