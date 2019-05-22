import React, { Component } from 'react';
import { View, Image, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Header, Content, Item, Form, Text, Button, Input, Left, Label, Right } from 'native-base';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

class CreatePostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            name: "",
            area: "",
            province: "",
            description: "",
            price: "",
            imageUrl: "",
            uid: "",
            key: "",
        };
    }

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);


    }

    componentWillMount() {
        if (this.props.navigation.state.params.view !== null) {
            this.setState({
                key: this.props.navigation.state.params.key,
                name: this.props.navigation.state.params.name,
                area: this.props.navigation.state.params.area,
                province: this.props.navigation.state.params.province,
                description: this.props.navigation.state.params.description,
                price: this.props.navigation.state.params.price,
                imageUrl: this.props.navigation.state.params.imageUrl,
                uid: this.props.navigation.state.params.uid
            })
        }
    }

    createPost = (name, area, province, description, price, imageUrl, uid) => {
        if (name && area && province && description && price && imageUrl != null) {
            firebase.database().ref("/posts").push({
                name,
                area,
                province,
                description,
                price,
                imageUrl,
                uid,
            }).then((data) => {
                console.log("------ Create Post Success: ", data);
                this.props.navigation.navigate('ListPost')
            }).catch((error) => {
                alert("error: ", error.message);
            });
        } else {
            alert("Please enter detail")
        }
    }

    updatePost = (key, name, area, province, description, price, imageUrl, uid) => {
        console.log("-------- Hello this is from CreatePost key issss: ",key)
        if (name && area && province && description && price && imageUrl != null) {
                firebase.database().ref("/posts/"+key).update({
                    name,
                    area,
                    province,
                    description,
                    price,
                    imageUrl,
                    uid,
                });
                this.props.navigation.replace('MyPost')
        } else {
            alert("Please enter detail");
        }
    }

    pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        alert(uploadUrl);
        this.setState({ imageUrl: uploadUrl })
    };



    render() {
        let { key, name, area, province, description, price, imageUrl, uid } = this.state;
        return (

            <Container style={styles.container}>
                <ScrollView>
                    <Form>
                        <Label style={{ marginTop: `5%`, alignSelf: 'center' }}>สร้างโพสต์ขายของ</Label>
                        <Item floatingLabel style={{ marginLeft: `5%`, marginRight: `5%` }}>
                            <Label>หัวข้อโพสต์</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })} />
                        </Item>

                        <Item floatingLabel style={{ marginLeft: `5%`, marginRight: `5%` }}>
                            <Label>บริเวณ</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.area}
                                onChangeText={area => this.setState({ area })} />
                        </Item>

                        <Item floatingLabel style={{ marginLeft: `5%`, marginRight: `5%` }}>
                            <Label>จังหวัด</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.province}
                                onChangeText={province => this.setState({ province })} />
                        </Item>

                        <Item floatingLabel style={{ marginLeft: `5%`, marginRight: `5%` }}>
                            <Label>รายละเอียด</Label>
                            <Input
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={true}
                                value={this.state.description}
                                onChangeText={description => this.setState({ description })}
                            />
                        </Item>

                        <Item floatingLabel style={{ marginLeft: `5%`, marginRight: `5%` }}>
                            <Label>ราคา</Label>
                            <Input
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={true}
                                value={this.state.price}
                                onChangeText={price => this.setState({ price })}
                            />
                        </Item>


                        {this.state.imageUrl ?
                            <View>
                                <Image source={{ uri: this.state.imageUrl }} style={{ alignSelf: 'center', justifyContent: "center", marginTop: 30, height: 250, width: 250 }} />
                                <Button full rounded success style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }} onPress={() => this.pickImage()}>
                                    <Text>อัพโหลดรูปภาพ</Text>
                                </Button>
                                <Button full rounded style={{ marginTop: 20, marginBottom: 50, marginLeft: `5%`, marginRight: `5%` }} onPress={() => { this.updatePost(key, name, area, province, description, price, imageUrl) }}>
                                    <Text>บันทึกการเปลี่ยนแปลง</Text>
                                </Button>
                            </View>
                            :
                            <View>
                                <Image source={require("../images/chooseImage.png")} style={{ alignSelf: 'center', justifyContent: "center", height: 250, width: 250 }} />
                                <Button full rounded success style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }} onPress={() => this.pickImage()}>
                                    <Text>อัพโหลดรูปภาพ</Text>
                                </Button>
                                <Button full rounded style={{ marginTop: 20, marginBottom: 50, marginLeft: `5%`, marginRight: `5%` }} onPress={() => { this.createPost(name, area, province, description, price, imageUrl, uid) }}>
                                    <Text>สร้างโพสต์</Text>
                                </Button>
                            </View>

                        }
                    </Form>
                </ScrollView>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
}

export default CreatePostScreen;

