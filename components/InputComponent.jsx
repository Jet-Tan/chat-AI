import React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

const InputComponent = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Type a message" />
            <Button title="Send" onPress={() => { /* handle send */ }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
});

export default InputComponent;
