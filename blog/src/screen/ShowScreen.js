import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id')
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {blogPost.title}
      </Text>
      <Text style={styles.content}>
        {blogPost.content}
      </Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}>
      <Feather name="edit" style={styles.iconStyle} />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 15,
    paddingVertical: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  content: {
    fontSize: 18
  },
  iconStyle: {
    fontSize: 24,
    paddingHorizontal: 10
  }
});

export default ShowScreen;