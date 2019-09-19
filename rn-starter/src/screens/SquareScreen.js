import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ColorCounter from '../components/ColorCounter';

const COLOR_INCREMENT = 10;

const SquareScreen = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const setColor = (color, change) => {
    //color === red, green, blue
    //change === +15, -15 
    switch (color) {
      case 'red':
        red + change > 255 ? setRed(255) : red + change < 0 ? setRed(0) : setRed(red + change);
        return;
      case 'blue':
        blue + change > 255 ? setBlue(255) : blue + change < 0 ? setBlue(0) : setBlue(blue + change);
        return;
      case 'green':
        green + change > 255 ? setGreen(255) : green + change < 0 ? setGreen(0) : setGreen(green + change);
        return;
      default:
        return;
    }
  };

  return (
    <View>
      <ColorCounter
        onIncrease={() => setColor('red', COLOR_INCREMENT)}
        onDecrease={() => setColor('red', -1 * COLOR_INCREMENT)}
        color="Red" />
      <ColorCounter
        onIncrease={() => setColor('blue', COLOR_INCREMENT)}
        onDecrease={() => setColor('blue', -1 * COLOR_INCREMENT)}
        color="Blue" />
      <ColorCounter
        onIncrease={() => setColor('green', COLOR_INCREMENT)}
        onDecrease={() => setColor('green', -1 * COLOR_INCREMENT)}
        color="Green" />
      <View style={{ width: 100, height: 100, backgroundColor: `rgb(${red},${green},${blue})` }} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default SquareScreen;