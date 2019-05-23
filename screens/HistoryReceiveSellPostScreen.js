import React, { Component } from 'react';
import { Image, FlatList, TouchableHighlight, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Container, SwipeRow, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase';

class HistoryReceiveSellPostScreen extends Component {
    constructor(props) {
        super(props);

        this.taskRef = firebase.database().ref("/posts");
        const data = [];
        this.state = {
            data: data,
            uid: ""
        };
    }

    componentDidMount() {
        this.loadMyPost(this.taskRef);
    }

    loadMyPost(taskRef) {
        const uid = firebase.auth().currentUser.uid
        this.setState({ uid: uid });
        console.log("UID: ", uid)
        taskRef.on("value", snapshot => {
            var posts = [];
            snapshot.forEach(child => {
                posts.push({
                    key: child.key,
                    name: child.val().name,
                    area: child.val().area,
                    province: child.val().province,
                    description: child.val().description,
                    price: child.val().price,
                    imageUrl: child.val().imageUrl,
                    isReceive: child.val().isReceive,
                    uid: child.val().uid,
                    receiverID: child.val().receiverID,
                });

            })
            const available_post = posts.filter(x => x.receiverID === uid)
            this.setState({
                data: available_post
            })
        })
    }

    extractKey = ({ name }) => name

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.viewDetail(
                item.name,
                item.area,
                item.province,
                item.description,
                item.price,
                item.imageUrl)} item={item}>
                <Card style={{ height: 150 }}>
                    <CardItem>
                        <Left>
                            <Image style={{ width: `40%`, height: 150 }} source={{ uri: item.imageUrl }} />
                            <Body style={{ width: `50%` }}>
                                <Text>{item.name}</Text>
                                <Text note>{item.area}</Text>
                                <Text note>{item.province}</Text>
                                {/* <Text note>{item.data}</Text> */}
                                {/* <Text note>{item.owner}</Text> */}
                                {/* <TouchableHighlight
                                    onPress={()=> this.checkForSell(item.key)}
                                    style={{
                                        marginTop: 30,
                                        alignSelf: 'flex-end',
                                        backgroundColor: "#F9A622",
                                        borderRadius: 30,
                                        width: 100,
                                        height: 35,
                                        justifyContent: 'center'
                                    }}>

                                    <Text style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        ซื้อสินค้า
                                </Text>
                                </TouchableHighlight> */}
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    viewDetail = (name, area, province, description, price, imageUrl) => {
        this.props.navigation.navigate('PostDetail',
            {
                name: name,
                area: area,
                province: province,
                description: description,
                price: price,
                imageUrl: imageUrl
            });
    }

    render() {
        return (
            <Container>
            <Content>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={this.extractKey}
                />
            </Content>
        </Container>
        );
    }
}

export default HistoryReceiveSellPostScreen;
