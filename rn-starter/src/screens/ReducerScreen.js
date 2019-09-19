import React, { useReducer } from 'react';
import { View, StyleSheet } from 'react-native';
import ColorCounter from '../components/ColorCounter';

const COLOR_INCREMENT = 10;

const reducer = (state, action) => {
  // state === { red : number, green: number, blue: number};
  // action === { colorToChange: 'red' || 'green' || 'blue', amount: 10 || -10 }

  switch (action.colorToChange) {
    case 'red':
      return { ...state, red: validate(state.red, action.amount) };
    case 'green':
      return { ...state, green: validate(state.green, action.amount) };
    case 'blue':
      return { ...state, blue: validate(state.blue, action.amount) };
    default:
      return state;
  }
};

const validate = (baseAmount, change) => {
  return baseAmount + change > 255 ? 255 : baseAmount + change < 0 ? 0 : baseAmount + change;
}

const SquareScreen = () => {
  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const { red, green, blue } = state;

  return (
    <View>
      <ColorCounter
        onIncrease={() => dispatch({ colorToChange: 'red', amount: COLOR_INCREMENT })}
        onDecrease={() => dispatch({ colorToChange: 'red', amount: -1 * COLOR_INCREMENT })}
        color="Red" />
      <ColorCounter
        onIncrease={() => dispatch({ colorToChange: 'blue', amount: COLOR_INCREMENT })}
        onDecrease={() => dispatch({ colorToChange: 'blue', amount: -1 * COLOR_INCREMENT })}
        color="Blue" />
      <ColorCounter
        onIncrease={() => dispatch({ colorToChange: 'green', amount: COLOR_INCREMENT })}
        onDecrease={() => dispatch({ colorToChange: 'green', amount: -1 * COLOR_INCREMENT })}
        color="Green" />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: `rgb(${red},${green},${blue})`
        }} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default SquareScreen;