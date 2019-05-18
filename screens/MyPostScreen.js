import React, { Component } from 'react';
import { Image, FlatList, TouchableHighlight, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import YellowButton from '../components/YellowButton';
import * as firebase from 'firebase';
import { SwipeListView } from 'react-native-swipe-list-view';


class MyPostScreen extends Component {
    constructor(props) {
        super(props);

        this.taskRef = firebase.database().ref("/posts");
        const data = [];
        this.state = {
            data: data
        };
    }

    componentDidMount() {
        this.loadMyPost(this.taskRef);
    }

    loadMyPost(taskRef) {
        const uid = firebase.auth().currentUser.uid
        console.log("UID: ",uid)
        taskRef.orderByChild('uid').equalTo(uid).on("value", snapshot => {
            var posts = [];
            snapshot.forEach(child => {
                posts.push({
                    key: child.key,
                    name: child.val().name,
                    area: child.val().area,
                    province: child.val().province,
                    descption: child.val().descption,
                    price: child.val().price,
                    imageUrl: child.val().imageUrl
                });

                this.setState({
                    data: posts
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

    extractKey = ({ name }) => name

    renderItem = ({ item }) => {
        return (
            <View onPress={() => this.viewDetail(
                item.name,
                item.area,
                item.province,
                item.descption,
                item.price,
                item.imageUrl)} item={item}>
                <Card 
                style={{ height: 150 }}>
                    <CardItem >
                        <Left>
                            <Image style={{ width: `40%`, height: 150 }} source={{ uri: item.imageUrl }}  />
                            <Body style={{ width: `50%` }}>
                                <Text>{item.name}</Text>
                                <Text note>{item.area}</Text>
                                <Text note>{item.province}</Text>
                                {/* <Text note>{item.data}</Text> */}
                                {/* <Text note>{item.owner}</Text> */}
                                <TouchableHighlight
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
                                </TouchableHighlight>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
             </View>
        )
    }

    render() {
        return (
            <Container>
                <Content>
                    <SwipeListView
                        useFlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        renderHiddenItem={(data) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity
                                    style={styles.swipeRight}>
                                    <Text style={styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={ () => alert("edit") }
                                    style={styles.swipeLeft}>
                                    <Text style={styles.backTextWhite}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-75}
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

export default MyPostScreen;
