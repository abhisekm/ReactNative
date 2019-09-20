import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const StateScreen = ({ navigation }) => {
  return (
    <View>

      <Button
        onPress={() => { navigation.navigate('Counter') }}
        title="Go to Counter Demo" />
      <Button
        onPress={() => { navigation.navigate('Colors') }}
        title="Go to Colors Demo" />
      <Button
        onPress={() => { navigation.navigate('Square') }}
        title="Go to Color Square Demo" />
      <Button
        onPress={() => { navigation.navigate('Reducer') }}
        title="Go to Color Reducer Demo" />
      <Button
        onPress={() => { navigation.navigate('Ex3') }}
        title="Go to Counter Reducer Demo" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default StateScreen;