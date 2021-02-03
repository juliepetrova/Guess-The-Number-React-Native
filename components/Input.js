import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => {
    return (
        // ... Assign own styles (spread operator)
        // Get style from parent component and merge it with the existing styles
        <TextInput {...props} style={{...styles.input, ...props.style}}/>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

export default Input;
