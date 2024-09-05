import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const HeaderComponent = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    logo: {
        height: 40,
        width: 100,
    },
});

export default HeaderComponent;
