import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SigninScreen = ({ navigation }) => {
  return (
    <>
      <Text>SigninScreen</Text>
      <Button
        title="Go to home"
        onPress={() => navigation.navigate('mainFlow')}
      />
    </>
  );

};

const styles = StyleSheet.create({

});

export default SigninScreen;