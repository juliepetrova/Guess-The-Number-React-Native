import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)

    const startNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);

    }

    const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber)
        setGuessRounds(0)
    }

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds)
    }

    let content = <StartGameScreen onStartGame={startGameHandler}/>
    if(userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    }else if(guessRounds > 0){
        content = <GameOverScreen rounds={guessRounds} userNumber={userNumber} onRestart={startNewGameHandler}/>
    }
  return (
    <View style={styles.container}>
        <Header title={"Guess a number"}/>
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});
