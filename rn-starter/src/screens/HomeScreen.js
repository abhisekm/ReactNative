import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Hello World!</Text>
      <Button
        onPress={() => { navigation.navigate('Components') }}
        title="Go to Components Demo" />
      <Button
        onPress={() => { navigation.navigate('List') }}
        title="Go to List Demo" />
      <Button
        onPress={() => { navigation.navigate('ImageScreen') }}
        title="Go to Image Demo" />
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
      <Button
        onPress={() => { navigation.navigate('Text') }}
        title="Go to Text Demo" />
      <Button
        onPress={() => { navigation.navigate('Password') }}
        title="Go to Password Demo" />
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