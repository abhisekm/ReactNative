import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const PrimitiveScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => { navigation.navigate('Text') }}
        title="Go to Text Demo" />
      <Button
        onPress={() => { navigation.navigate('Password') }}
        title="Go to Password Demo" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default PrimitiveScreen;