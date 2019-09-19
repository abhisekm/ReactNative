import React, { useReducer } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 };
    case 'decrease':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const CounterReducerScreen = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const { count } = state;

  return (
    <View>
      <Text>Counter Screen</Text>
      <Button
        title="Increase"
        onPress={() => dispatch({ type: 'increase' })} />
      <Button
        title="Decrease"
        onPress={() => dispatch({ type: 'decrease' })} />
      <Text>Counter Count: {count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CounterReducerScreen;