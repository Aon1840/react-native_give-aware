import React, { Component } from 'react'
import { View, Image, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Header, Content, Item, Form, Text, Button, Input, Left, Label, Right } from 'native-base';
import * as firebase from 'firebase';

class PostDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: ""
        };
    }

    componentDidMount() {
        let { uid } = this.props.navigation.state.params;
        firebase.database().ref('/Users/' + uid).on("value", snapshot => {
            console.log("name of user : ", snapshot.val().firstname)
            // const owner = snapshot.val().firstname + " " + snapshot.val().lastname
            this.setState({
                owner: snapshot.val().firstname + " " + snapshot.val().lastname
            })
        })
    }

    render() {
        let { name, area, province, description, price, imageUrl, date } = this.props.navigation.state.params;
        // firebase.database().ref('/Users/' + uid).on("value", snapshot => {
        //     console.log("name of user : ", snapshot.val().firstname)
        //     const owner = snapshot.val().firstname + " " + snapshot.val().lastname
        //     this.setState({
        //         owner: snapshot.val().firstname + " " + snapshot.val().lastname
        //     })
        // })
        console.log("price: ",price)
        return (
            <View>
                <Image source={{ uri: imageUrl }} style={{ alignSelf: 'center', justifyContent: "center", height: 250, width: 250 }} />
                <Text>ชื่อสินค้า: {name}</Text>
                <Text>บริเวณ: {area}</Text>
                <Text>จังหวัด: {province}</Text>
                <Text>เจ้าของโพสต์: {this.state.owner}</Text>
                <Text>รายละเอียด: {description}</Text>
                {price == undefined ?
                    null
                    :
                    <Text>ราคา: {price}</Text>
                }
                <Text>เวลาโพสต์: {date}</Text>
            </View>
        )
    }
}

export default PostDetailScreen;