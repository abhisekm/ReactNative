import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';
import Spacer from '../components/Spacer';

const TrackCreateScreen = () => {
  return (
    <SafeAreaView forceInset={{ top='always' }}>
      <Text h3>TrackCreateScreen</Text>
      <Spacer>
        <Map />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default TrackCreateScreen;