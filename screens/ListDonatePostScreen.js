import React, { Component } from 'react';
import { Image, FlatList, TouchableHighlight, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase';
import { SwipeListView } from 'react-native-swipe-list-view';

class ListDonatePostScreen extends Component {
    constructor(props) {
        super(props);
        this.taskRef = firebase.database().ref("/donateposts");
        const data = [];
        this.state = {
            data: data,
        }
    }

    componentDidMount() {
        this.listtenForNewPost(this.taskRef);
    }

    componentWillUnmount(){
        this.listtenForNewPost(this.taskRef);
    }

    listtenForNewPost(taskRef) {
        taskRef.on("value", snapshot => {
            var posts = [];
            snapshot.forEach(child => {
                posts.push({
                    key: child.key,
                    name: child.val().name,
                    area: child.val().area,
                    province: child.val().province,
                    description: child.val().description,
                    imageUrl: child.val().imageUrl,
                    isReceive: child.val().isReceive,
                    uid: child.val().uid,
                });
                const available_post = posts.filter(x => x.isReceive === false)
                this.setState({
                    data: available_post
                })
            })
        })
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

    checkForDonate = (key) => {
        console.log("------ key: ",key)
        Alert.alert(
            'คุณมั่นใจนะว่าจะรับบริจาคชิ้นนี้?',
            'เมื่อกดแล้วสินจะไปอยู่ในประวัติการรับบริจาค',
            [
                {text: 'ตกลง', onPress: () => this.receiveDonatePost(key) },
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }
            ],
            {cancelable: false}
        )
    }

    receiveDonatePost = (key) => {
        firebase.database().ref('donateposts/'+key).update({
            receiverID: firebase.auth().currentUser.uid,
            isReceive: true
        }).then( (data) => {
            console.log("data when press sell post : ",data)
            alert("Succcess!")
        }).catch( (error) => {
            alert(error.message)
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
                                <TouchableHighlight
                                    onPress = {()=> this.checkForDonate(item.key)}
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
                                        รับบริจาค
                                </Text>
                                </TouchableHighlight>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Container>
            {/* <Header /> */}
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

const styles = StyleSheet.create({
    swipeRight: {
        color: 'white',
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        marginTop: 8,
        marginRight: 5,
        height: 150,
        width: 75,
        backgroundColor: 'red',
        right: 0,
    },
    swipeLeft: {
        color: 'white',
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        marginTop: 8,
        marginLeft: 5,
        height: 150,
        width: 75,
        backgroundColor: 'blue',
        left: 0,
    }
});

export default ListDonatePostScreen;
