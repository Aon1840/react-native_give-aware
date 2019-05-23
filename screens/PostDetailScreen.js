import React, { Component } from 'react'
import { View, Image, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Header, Content, Item, Form, Text, Button, Input, Left, Label, Right } from 'native-base';
import * as firebase from 'firebase';

class PostDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        // let { name, area, province, description, price, imageUrl } = this.props.navigation.state.params;
    }

    render() {
        let { name, area, province, description, price, imageUrl, date } = this.props.navigation.state.params;
        return (
            <View>
                <Image source={{ uri: imageUrl }} style={{alignSelf: 'center', justifyContent: "center", height: 250, width: 250}} />
                <Text>{name}</Text>
                <Text>{area}</Text>
                <Text>{province}</Text>
                <Text>{description}</Text>
                <Text>{price}</Text>
                <Text>{date}</Text>
            </View>
        )
    }
}

export default PostDetailScreen;