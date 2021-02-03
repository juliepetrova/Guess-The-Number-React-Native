import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}><Text>Game is over</Text>
        <Text>Number of rounds: {props.rounds}</Text>
            <Text>Number was: {props.userNumber}</Text>
        <MainButton onPress={props.onRestart}>New game</MainButton></View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default GameOverScreen;
