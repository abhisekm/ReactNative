import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const PrimitiveScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => { navigation.navigate('Components') }}
        title="Go to Components Demo" />
      <Button
        onPress={() => { navigation.navigate('List') }}
        title="Go to List Demo" />
      <Button
        onPress={() => { navigation.navigate('ImageScreen') }}
        title="Go to Image Demo" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default PrimitiveScreen;