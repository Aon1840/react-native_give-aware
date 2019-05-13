import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen'
import { createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator(
    {
       Home: {
           screen: HomeScreen
       },
    },
    {
       initialRouteName: "Home"
    }
   ) ;

AppNavigator.navigationOptions = {
    header: null,
}

const AppContainer = createAppContainer(AppNavigator) ;

export default AppContainer ;