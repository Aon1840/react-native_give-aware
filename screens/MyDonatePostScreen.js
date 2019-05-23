import React, { Component } from 'react';
import { Image, FlatList, TouchableHighlight, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Container, SwipeRow, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import YellowButton from '../components/YellowButton';
import * as firebase from 'firebase';
import { SwipeListView } from 'react-native-swipe-list-view';


class MyDonatePostScreen extends Component {
    constructor(props) {
        super(props);

        this.taskRef = firebase.database().ref("/donateposts");
        const data = [];
        this.state = {
            data: data,
            uid: ""
        };
    }

    componentDidMount() {
        this.loadMyPost(this.taskRef);
    }

    componentWillUnmount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.loadMyPost(this.taskRef);
        })
    }

    loadMyPost(taskRef) {
        const uid = firebase.auth().currentUser.uid
        this.setState({ uid: uid });
        console.log("UID: ", uid)
        taskRef.orderByChild('uid').equalTo(uid).on("value", snapshot => {
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
                    date: child.val().date,
                });

                this.setState({
                    data: posts
                })
            })
        })
    }

    viewDetail = (key, name, area, province, description, imageUrl, uid, date) => {
        this.props.navigation.navigate('UpdateDonatePost',
            {
                key: key,
                name: name,
                area: area,
                province: province,
                description: description,
                imageUrl: imageUrl,
                uid: uid,
                date: date,
            });
    }

    checkForDelete = (key) => {
        console.log("key is from checkForDelete: ", key)
        Alert.alert(
            'คุณมั่นใจนะว่าจะลบ?',
            'ถ้าลบมันจะโพสต์ของคุณจะหายไปจริงๆนะ',
            [
                { text: 'ลบ', onPress: () => this.deletePost(key) },
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    deletePost = (key) => {
        console.log("key is from deletePost: ", key)
        firebase.database().ref('donateposts/' + key).remove()
            .then((data) => {
                console.log("data from delete: ", data);
                alert("Delete Success!")
            }).catch((error) => {
                alert(error.message)
            })
    }

    extractKey = ({ name }) => name

    renderHiddenItem = ({ item }) => {
        return (
            <View style={styles.rowBack}
                onPress={() => alert("hello")}>
                <TouchableOpacity
                    onPress={() => this.checkForDelete(item.key)}
                    style={styles.swipeRightRight}>
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderItem = ({ item }) => {
        return (
            <TouchableHighlight onPress={() => this.viewDetail(
                item.key,
                item.name,
                item.area,
                item.province,
                item.description,
                item.imageUrl,
                this.state.uid,
                item.date)} item={item}>
                <Card
                    style={{ height: 150 }}>
                    <CardItem >
                        <Left>
                            <Image style={{ width: `40%`, height: 150 }} source={{ uri: item.imageUrl }} />
                            <Body style={{ width: `50%` }}>
                                <Text>{item.name}</Text>
                                <Text note>{item.area}</Text>
                                <Text note>{item.province}</Text>
                                <Text note>{item.date}</Text>
                                {/* <Text note>{item.owner}</Text> */}
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.data == "" ?
                        <Image source={require("../images/noPostYet.jpg")} style={{ marginTop: 20, alignSelf: 'center', justifyContent: "center", height: 250, width: 250 }} />
                        :
                        <SwipeListView
                            useFlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            renderHiddenItem={this.renderHiddenItem}
                            rightOpenValue={-75}
                        />
                    }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    swipeRightRight: {
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
    backTextWhite: {
        color: '#FFF',
    },
});

export default MyDonatePostScreen;
