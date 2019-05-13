import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default class RegisterScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> Register Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});