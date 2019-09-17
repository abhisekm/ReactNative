import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const ComponentsScreen = () => {
    const greetings = 'Hello There!!';
    const jsxElement = <Text>This is a JSX Element</Text>

    return (
        <View>
            <Text style={styles.textStyle}>This is the Components Screen</Text>
            <Text>{greetings}</Text>
            {jsxElement}
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 30
    }
});

export default ComponentsScreen;