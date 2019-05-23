import React, { Component } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Content, Item, Form, Text, Button, Input, Left, Label, Right } from 'native-base';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';

class UpdatePostSellScreen extends Component {
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
            isReceive: "",
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
                uid: this.props.navigation.state.params.uid,
                isReceive: this.props.navigation.state.params.isReceive,
            })
        }
    }

    updatePost = (key, name, area, province, description, price, imageUrl, uid) => {
        if (this.state.isReceive == false) {
            if (name && area && province && description && price && imageUrl != null) {
                firebase.database().ref("/posts/" + key).update({
                    name,
                    area,
                    province,
                    description,
                    price,
                    imageUrl,
                    uid,
                });
                this.props.navigation.replace('MySellPost')
            } else {
                alert("กรุณากรอกข้อมูลให้ครบ");
            }
        } else {
            alert("โพสต์นี้มีคนซื้อแล้ว ไม่สามารถแก้ไขได้");
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
                            <Image source={{ uri: this.state.imageUrl }} style={{ alignSelf: 'center', justifyContent: "center", marginTop: 30, height: 250, width: 250 }} />
                            <Button full rounded success style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }} onPress={() => this.pickImage()}>
                                <Text>อัพโหลดรูปภาพ</Text>
                            </Button>
                            <Button full rounded style={{ marginTop: 20, marginBottom: 50, marginLeft: `5%`, marginRight: `5%` }} onPress={() => { this.updatePost(key, name, area, province, description, price, imageUrl, uid) }}>
                                <Text>บันทึกการเปลี่ยนแปลง</Text>
                            </Button>
                        </View>
                    </Form>
                </ScrollView>
            </Container>
        );
    }
}

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

    blob.close();

    return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default UpdatePostSellScreen;
