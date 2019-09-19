import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CounterScreen = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View>
      <Text>Counter Screen</Text>
      <Button
        title="Increase"
        onPress={() => {
          //Dont do this
          // counter++
          setCounter(counter + 1);
        }} />
      <Button
        title="Decrease"
        onPress={() => {
          setCounter(counter - 1);
        }} />
      <Text>Counter Count: {counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CounterScreen;