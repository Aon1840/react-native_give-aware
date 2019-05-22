import React, { Component } from 'react';
// import { View, Text, Image, Animated, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert, StyleSheet, Text, View, ScrollView, Animated, Platform, TouchableOpacity, RefreshControl, Image, FlatList } from 'react-native';
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
      data: [
      ]
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
    this.props.navigation.openDrawer()
  }

  _onPressSearch = () => {
    console.log('in _onPressSearch')

    Alert.alert(
      'Search'
    )
  }

  _logout = async () => {
    await this.props.navigation.replace('Login');
    await firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  // _getUser = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({
  //       user: user
  //     })
  //     // alert(user.email);
  //     console.log("User: ", user);
  //     console.log("UID User: ", user.uid);
  //   })
  // }

  componentDidMount() {
    // this._getUser();

    // firebase.auth().onAuthStateChanged(user => {
    //   alert(user.uid);
    //   console.log("state change: ",user.uid)
    // })
    // const uid = firebase.auth().currentUser.uid
    // console.log("UID from current user: ",uid)
  }

  createPost(){
    this.props.navigation.navigate('CreatePost',
            {
                key: "",
                name: "",
                area: "",
                province: "",
                description: "",
                price: "",
                imageUrl: "",
                uid: firebase.auth().currentUser.uid
            });
    // this.props.navigation.navigate('CreatePost')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header onPressBack={this._onPressBack}
          // onPressBurgerMenu = { this.props.navigation.openDrawer()}
          onPressBurgerMenu={this._onPressBurgerMenu}
          onPressSearch={this._onPressSearch}
        />

        <ScrollView>
          <View>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            

            <Button full rounded style={{ marginLeft: `5%`, marginRight: `5%` }}
              onPress={() => { this._logout() }}>
              <Text>Logout</Text>
            </Button>

            <Button full rounded style={{ marginTop: `5%`, marginLeft: `5%`, marginRight: `5%` }}
              onPress={() => { this.props.navigation.navigate('ListSellPost') }}>
              <Text>See all Sell Post</Text>
            </Button>

            <Button full rounded style={{ marginTop: `5%`, marginLeft: `5%`, marginRight: `5%` }}
              onPress={() => { this.props.navigation.navigate('ListDonatePost') }}>
              <Text>See all Donate Post</Text>
            </Button>

            <Button full rounded style={{ marginTop: `5%`, marginBottom: `10%`, marginLeft: `5%`, marginRight: `5%` }}
              onPress={() => { this.props.navigation.navigate('MySellPost') }}>
              <Text>My Sell Post</Text>
            </Button>

            <Button full rounded style={{ marginTop: `5%`, marginBottom: `10%`, marginLeft: `5%`, marginRight: `5%` }}
              onPress={() => { this.props.navigation.navigate('MyDonatePost') }}>
              <Text>My Donate Post</Text>
            </Button>

          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => this.createPost()} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    // margin: 5,
    // backgroundColor: 'white',
    // height: `100%`,
    // justifyContent: 'space-around',
    // paddingLeft: 10,
    // elevation: 1
  },
  list: {
    margin: 5,
    backgroundColor: 'white',
    height: 80,
    justifyContent: 'space-around',
    paddingLeft: 10,
    elevation: 1
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  }
})

export default HomeScreen;
