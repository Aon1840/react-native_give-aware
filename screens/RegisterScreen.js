import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Container, Item, Form, Input, Button, Label, Alert } from "native-base";
import * as firebase from 'firebase';


export default class RegisterScreen extends Component {

    static navigationOptions = {
        // header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            rePassword: "",
        };
    }

    signUp = (email, password, rePassword, firstname, lastname) => {

        if (email && password && firstname && lastname && rePassword != null) {
            if ( password === rePassword) {
                console.log("password: ",password)
                console.log("rePassword: ",rePassword)

                // Create User
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( (data) => {
                    this.addUserData(email,password,firstname,lastname);
                    alert("Register Success!");
                    this.props.navigation.navigate("Login")
                    console.log("data: ",data);
                }).catch( (error) => {
                    alert(error.message);
                    console.log(error.message);
                })
            } else {
                alert("Password is invalid please try agian")
            }
        //   try {
        //     firebase.auth().createUserWithEmailAndPassword(email, password);
        //   } catch (error) {
        //     alert(error.toString(error))
        //     console.log(error.toString(error));
        //   }
        // } else {
        //   alert("Please enter email or password")
        } else {
            alert("Please enter the information")
        }
    }

    addUserData(email, password, firstname, lastname){
        firebase.database().ref('Users/').push({
            email,
            password,
            firstname,
            lastname
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }

    render() {
        let {firstname, lastname, email, password, rePassword} = this.state;
        return (
            <Container style={styles.container}>
                <Form>

                    <Item floatingLabel style={{marginTop: `20%`, marginLeft: `5%`, marginRight: `5%`}}>
                        <Label>Firstname</Label>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={firstname => this.setState({ firstname })} />
                    </Item>

                    <Item floatingLabel style={{marginLeft: `5%`, marginRight: `5%`}}>
                        <Label>Lastname</Label>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={lastname => this.setState({ lastname })} />
                    </Item>

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

                    <Item floatingLabel style={{marginLeft: `5%`, marginRight: `5%`}}>
                        <Label>Re-Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={true}
                            onChangeText={rePassword => this.setState({ rePassword })}
                        />
                    </Item>


                    <Button full rounded success style={{ marginTop: 20, marginLeft: `5%`, marginRight: `5%` }}
                        // onPress={() => { this.signUp() }}
                        
                        onPress={() =>  this.signUp(email, password, rePassword, firstname, lastname,) }
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