import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const FirstExercise = () => {
  const name = 'Stephen';

  return (
    <View>
      <Text style={style.header}>Getting started with react native!</Text>
      <Text style={style.subHeader}>My name is {name}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    fontSize: 45
  },
  subHeader: {
    fontSize: 20
  }
});

export default FirstExercise;