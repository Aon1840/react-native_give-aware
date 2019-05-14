import React, { Component } from 'react';
// import { View, Text, Image, Animated, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert, StyleSheet, Text, View, ScrollView, Animated, Platform, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Button } from "native-base";


import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

import Header from '../components/AppHeader'
import * as firebase from 'firebase';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      // refreshing: false,
    };
  }

  _onPressBack = () => {
    console.log('in _onPressBack')
    Alert.alert(
      'Back'
    )
  }

  _onPressBurgerMenu = () => {
    console.log('in _onPressBurgerMenu')

    Alert.alert(
      'Burger Menu'
    )
  }

  _onPressSearch = () => {
    console.log('in _onPressSearch')

    Alert.alert(
      'Search'
    )
  }

  _logout = () => {
    this.props.navigation.replace('Login');
  }

  _getUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user:user
      })
      alert(user.email);
      console.log("User: ",user);
      console.log("UID User: ",user.uid);
    })
  }

  componentDidMount(){
    this._getUser();
  }

  render() {
    return (
      <View>
        <Header onPressBack = {this._onPressBack}
                onPressBurgerMenu = {this._onPressBurgerMenu}
                onPressSearch = {this._onPressSearch}
        />

        <ScrollView>
          <Text> HomeScreen </Text>
          <Button full rounded style={{ marginBottom: `10%`, marginLeft: `5%`, marginRight: `5%` }}
              onPress={() => { this._logout() }}
              >

              <Text>Signup</Text>
          </Button>
        </ScrollView>

        
      </View>
    );
  }
}

export default HomeScreen;
