import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <>
      <Text>SignupScreen</Text>
      <Button
        title="Go to Signin"
        onPress={() => navigation.navigate('Signin')}
      />
    </>
  );
};

const styles = StyleSheet.create({

});

export default SignupScreen;