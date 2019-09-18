import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageDetail from '../components/ImageDetail';

const ImageScreen = () => {
  return (
    <View>
      <ImageDetail
        title="forest"
        imageSource={require('../../assets/forest.jpg')}
        score={5} />
      <ImageDetail
        title="beach"
        imageSource={require('../../assets/beach.jpg')}
        score={10} />
      <ImageDetail
        title="mountain"
        imageSource={require('../../assets/mountain.jpg')}
        score={4} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageScreen;