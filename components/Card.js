import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = props => {
    return (
        // ... Assign own styles (spread operator)
        // Get style from parent component and merge it with the existing styles
        <View style={{...styles.card, ...props.style}}>{props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 20,
        borderRadius: 10,
    }
});

export default Card;
