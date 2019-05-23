import React, { Component } from 'react';
import { View, Image, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Header, Content, Item, Form, Text, Button, Input, Left, Label, Right, Tab, Tabs } from 'native-base';
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

    createSellPost = (name, area, province, description, price, imageUrl, uid) => {
        console.log("image url from create sell post: ",imageUrl)
        if (name && area && province && description && price && imageUrl != "") {
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

    createDonatePost = (name, area, province, description, imageUrl, uid) => {
        if (name && area && province && description && imageUrl != null) {
            firebase.database().ref("/donateposts").push({
                name,
                area,
                province,
                description,
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
            <Container>

                    <Tabs>
                        {/* -------------------- Start Create Sell Post -------------------- */}
                        <Tab heading="โพสต์ขายของ">
                            <Container style={styles.container}>
                                <ScrollView>
                                    <Form>
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
                                                autoCapitalize="none"
                                                autoCorrect={true}
                                                value={this.state.description}
                                                onChangeText={description => this.setState({ description })}
                                            />
                                        </Item>

                                        <Item floatingLabel style={{ marginLeft: `5%`, marginRight: `5%` }}>
                                            <Label>ราคา</Label>
                                            <Input
                                                keyboardType="numeric"
                                                autoCapitalize="none"
                                                autoCorrect={true}
                                                value={this.state.price}
                                                onChangeText={price => this.setState({ price })}
                                            />
                                        </Item>

                                            <View>
                                                <Image source={require("../images/chooseImage.png")} style={{ marginTop:20, alignSelf: 'center', justifyContent: "center", height: 250, width: 250 }} />
                                                <Button full rounded success style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }} onPress={() => this.pickImage()}>
                                                    <Text>อัพโหลดรูปภาพ</Text>
                                                </Button>
                                                <Button full rounded style={{ marginTop: 20, marginBottom: 50, marginLeft: `5%`, marginRight: `5%` }} onPress={() => { this.createSellPost(name, area, province, description, price, imageUrl, uid) }}>
                                                    <Text>สร้างโพสต์</Text>
                                                </Button>
                                            </View>

                                    </Form>
                                </ScrollView>
                            </Container>
                        </Tab>
                        {/* -------------------- End Create Sell Post -------------------- */}
                        
                        {/* -------------------- Start Create Donate Post -------------------- */}
                        <Tab heading="โพสต์บริจาค">
                            <Container style={styles.container}>
                                <ScrollView>
                                    <Form>
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
                                                autoCapitalize="none"
                                                autoCorrect={true}
                                                value={this.state.description}
                                                onChangeText={description => this.setState({ description })}
                                            />
                                        </Item>

                                            <View>
                                                <Image source={require("../images/chooseImage.png")} style={{ marginTop:20, alignSelf: 'center', justifyContent: "center", height: 250, width: 250 }} />
                                                <Button full rounded success style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }} onPress={() => this.pickImage()}>
                                                    <Text>อัพโหลดรูปภาพ</Text>
                                                </Button>
                                                <Button full rounded style={{ marginTop: 20, marginBottom: 50, marginLeft: `5%`, marginRight: `5%` }} onPress={() => { this.createDonatePost(name, area, province, description, imageUrl, uid) }}>
                                                    <Text>สร้างโพสต์</Text>
                                                </Button>
                                            </View>


                                    </Form>
                                </ScrollView>
                            </Container>
                        </Tab>
                        {/* -------------------- Create Donate Post -------------------- */}
                    </Tabs>
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

