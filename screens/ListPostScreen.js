import React, { Component } from 'react';
import { Image, FlatList, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import YellowButton from '../components/YellowButton';
import * as firebase from 'firebase';

// const HEADER_MAX_HEIGHT = 300;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ListPostScreen extends Component {
    constructor(props) {
        super(props);

        this.taskRef = firebase.database().ref("/posts");
        const data = [];
        this.state = {
            data: data,
            // data: [
            //     {
            //         name: 'หมวกกันน็อค',
            //         desription: 'บลาบลาบลา',
            //         area: 'บางประกอก',
            //         province: 'กรุงเทพ',
            //         data: '24/02/2019',
            //         owner: 'สมศรี อำอนาย',
            //         imageUrl: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/166086bd-7d2e-49f7-abac-f256399a979f?alt=media&token=a6d36200-aead-4059-ba98-23eb04c81f4b'
            //     },
            //     {
            //         name: 'หมวกกันน็อค',
            //         desription: 'บลาบลาบลา',
            //         area: 'บางประกอก',
            //         province: 'กรุงเทพ',
            //         data: '24/02/2019',
            //         owner: 'สมศรี อำอนาย',
            //         imageUrl: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/eec226dc-a217-4c55-ad42-806f8b30d5e6?alt=media&token=bf97a41a-fd62-46c1-a8dc-34c330d5ef7e'
            //     }
            // ]
        };
    }

    //   static navigationOptions = {
    //     header: null
    //   }

    componentDidMount() {
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

    extractKey = ({ imageUrl }) => imageUrl

    renderItem = ({ item }) => {
        return (
            <Card>
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

                    {/* <Card>
                        <CardItem>
                            <Left>
                                <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/166086bd-7d2e-49f7-abac-f256399a979f?alt=media&token=a6d36200-aead-4059-ba98-23eb04c81f4b' }} />
                                <Body style={{ width: `50%` }}>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Button><Text>Hello</Text></Button>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image style={{ width: `40%`, height: 200 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/eec226dc-a217-4c55-ad42-806f8b30d5e6?alt=media&token=bf97a41a-fd62-46c1-a8dc-34c330d5ef7e' }} />
                                <Body style={{ width: `50%` }}>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Button><Text>Hello</Text></Button>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image style={{ width: 150, height: 100 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/166086bd-7d2e-49f7-abac-f256399a979f?alt=media&token=a6d36200-aead-4059-ba98-23eb04c81f4b' }} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Button><Text>Hello</Text></Button>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image style={{ width: 150, height: 100 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/166086bd-7d2e-49f7-abac-f256399a979f?alt=media&token=a6d36200-aead-4059-ba98-23eb04c81f4b' }} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Button><Text>Hello</Text></Button>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image style={{ width: 150, height: 100 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/166086bd-7d2e-49f7-abac-f256399a979f?alt=media&token=a6d36200-aead-4059-ba98-23eb04c81f4b' }} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Button><Text>Hello</Text></Button>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image style={{
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    width: 150,
                                    height: 10
                                }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/166086bd-7d2e-49f7-abac-f256399a979f?alt=media&token=a6d36200-aead-4059-ba98-23eb04c81f4b' }} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Button><Text>Hello</Text></Button>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image style={{ width: 150, height: 100 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/projecthybird.appspot.com/o/166086bd-7d2e-49f7-abac-f256399a979f?alt=media&token=a6d36200-aead-4059-ba98-23eb04c81f4b' }} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Text note>GeekyAnts</Text>
                                    <Button><Text>Hello</Text></Button>
                                </Body>
                            </Left>
                        </CardItem>

                    </Card> */}
                </Content>
            </Container>
        );
    }
}


export default ListPostScreen;
