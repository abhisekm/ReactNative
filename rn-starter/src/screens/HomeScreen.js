import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => { navigation.navigate('Primitive') }}
        title="Primitive Demos" />
      <Button
        onPress={() => { navigation.navigate('State') }}
        title="State Demos" />
      <Button
        onPress={() => { navigation.navigate('TextInput') }}
        title="Text Input Demos" />
      <Button
        onPress={() => { navigation.navigate('Box') }}
        title="Go to Box Layout Demo" />
      <Button
        onPress={() => { navigation.navigate('FlexBox') }}
        title="Go to Flex Box Layout Demo" />
      {/* <TouchableOpacity onPress={() => { props.navigation.navigate('List') }}>
        <Text>Go to List Demo</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;