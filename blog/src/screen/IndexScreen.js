import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost } = useContext(Context);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => `${blogPost.id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => { navigation.navigate('Show', { id: item.id }) }}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => { deleteBlogPost(item.id) }}>
                  <Feather name="trash" style={styles.iconStyle} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
      <Feather name="plus" style={styles.iconStyle} />
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18
  },
  iconStyle: {
    fontSize: 24,
    paddingHorizontal: 10
  }
});

export default IndexScreen;
