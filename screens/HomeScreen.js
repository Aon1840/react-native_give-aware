import React, { Component } from 'react';
// import { View, Text, Image, Animated, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert, StyleSheet, Text, View, ScrollView, Animated, Platform, TouchableOpacity, RefreshControl, Image } from 'react-native';

import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

import Header from '../components/AppHeader'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <View>
        <Header onPressBack = {this._onPressBack}
                onPressBurgerMenu = {this._onPressBurgerMenu}
                onPressSearch = {this._onPressSearch}
        />

        <ScrollView>
          <Text> HOME SCREENNN </Text>
        </ScrollView>

        
      </View>
    );
  }
}

export default HomeScreen;
