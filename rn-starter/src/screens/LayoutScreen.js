import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const LayoutScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => { navigation.navigate('Box') }}
        title="Go to Box Layout Demo" />
      <Button
        onPress={() => { navigation.navigate('FlexBox') }}
        title="Go to Flex Box Layout Demo" />
      <Button
        onPress={() => { navigation.navigate('Position') }}
        title="Go to Position Layout Demo" />
      <Button
        onPress={() => { navigation.navigate('LayoutEx') }}
        title="Go to Layout Exercise Demo" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default LayoutScreen;