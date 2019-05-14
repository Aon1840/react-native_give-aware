import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Container, Item, Form, Input, Button, Label, Alert } from "native-base";
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
firebase.initializeApp(firebaseConfig);

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    signUp = () => {
        this.props.navigation.navigate('Register')
    }

    signIn = (email, password) => {
        console.log("email: "+email+" ,password: "+password);
    
        if (email && password != "") {
        //   try {
        //     console.log("pass this line")
        //     firebase.auth().signInWithEmailAndPassword(email, password);
        //     firebase.auth().onAuthStateChanged(user => {
        //     //   alert(user.email);
        //       this.props.navigation.navigate('Home')
        //     })
        //   } catch (error) {
        //     alert(error.toString(error))
        //     console.log(error.toString(error));
        //   }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                this.props.navigation.replace('Home')
                console.log('data ',data);
            }).catch((error) => {
                alert(error.message)
                console.log('error ',error)
            })
        } else {
          alert("Please enter email or password")
        }
        
    }

    render() {
        return (
            <Container style={styles.container}>
                <Image style={{alignSelf: 'center', justifyContent: "center", marginTop: `50%`}} source={require("../assets/icon.png")} />
                <Form>
                    <Item floatingLabel style={{marginLeft: `5%`, marginRight: `5%`}}>
                        <Label>Email</Label>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={email => this.setState({ email })} />
                    </Item>

                    <Item floatingLabel style={{marginLeft: `5%`, marginRight: `5%`}}>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={true}
                            onChangeText={password => this.setState({ password })}
                        />
                    </Item>

                    <Button full rounded style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }}
                        onPress={() => this.signIn(this.state.email, this.state.password)}>
                        <Text>SignIn</Text>
                    </Button>

                    <Button full rounded success style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }}
                        onPress={() => { this.signUp() }}
                        // onPress={() => { this.signUp(this.state.email, this.state.password); }}
                        >

                        <Text>Signup</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});