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