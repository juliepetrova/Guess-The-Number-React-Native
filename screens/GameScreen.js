// Survives component rerenders - use Ref
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import Colors from "../constants/Colors";
import Card from "../components/Card";
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton'



const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNumb = Math.floor(Math.random() * (max - min)) + min;
    if (randNumb === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randNumb;
    }
}
const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const [rounds, setRounds] = useState(0)
    // Would not regenerate (stays the value)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props;

    // Execute every time after rendering
    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(rounds);
        }
    },
        //Will only run if those dependencies are changed
        [currentGuess, onGameOver, userChoice ])

    const nextGuess = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || direction === 'higher' && currentGuess > props.userChoice){
            Alert.alert("Cheating not allowed!", "You confused the buttons!", [{text:'Sorry', style:'cancel'}])
            return;
        }
        if(direction === 'lower'){
            // Does not rerender component
            currentHigh.current = currentGuess;
        }else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds+1)
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <View style={styles.outputMessageView}><Text style={styles.textOutput}>{currentGuess}</Text></View>
            <Card style={styles.buttonContainer}>
                {/*<View style={styles.button}><Button title={"Lower"} onPress={nextGuess.bind(this, 'lower')} color={Colors.accent}/></View>*/}
                {/*<View style={styles.button}><Button title={"Higher"} onPress={nextGuess.bind(this, 'higher')} color= {Colors.primary}/></View>*/}
                <MainButton onPress={nextGuess.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white"/></MainButton>
                <MainButton onPress={nextGuess.bind(this, 'higher')}> <Ionicons name="md-add" size={24} color="white"/></MainButton>

            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    outputMessageView: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textOutput: {
        color: Colors.accent,
        fontSize: 22
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    button: {
        width: 100,
    },
});

export default GameScreen;
