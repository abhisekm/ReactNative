import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
  const { state: { currentLocation } } = useContext(LocationContext);

  if (!currentLocation) {
    return null;
  }

  console.log(state);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 12.9767934,
        longitude: 77.6193799,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
    </MapView>
  )
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;