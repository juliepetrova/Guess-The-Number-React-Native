import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import MainButton from '../components/MainButton'

const StartGameScreen = props => {

    const[enteredValue, setEnteredValue] = useState('');
    const [confirmed,setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(0)
    // Gets inputText
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number", "Number has to be between 1 and 99", [{text: "Okay", style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }
    let confirmedOutput;
    if(confirmed){
        confirmedOutput = <Card style={styles.outputMessage}><Text>Chosen number: </Text>
        <View style={styles.outputMessageView}><Text style={styles.textOutput}>{selectedNumber}</Text></View>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start game</MainButton></Card>
    }
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <Input style={styles.input} blurOnSubmit autoCorrect={false} keyboardType="numeric" maxLenght={2}
                onChangeText={numberInputHandler} value={enteredValue}/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title={"Reset"} onPress={resetInputHandler} color={Colors.accent}/></View>
                    <View style={styles.button}><Button title={"Confirm"} onPress={confirmInputHandler} color= {Colors.primary}/></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    outputMessage: {
        margin: 20,
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
    }
});

export default StartGameScreen;
