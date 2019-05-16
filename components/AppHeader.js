import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Platform, } from 'react-native';
import { Container, Header, Body, Title, Item, Left, Right, Input, Icon, Button} from "native-base";

import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
        titleName: "Give Aware",
    };

  }

  render() {
    return (
        <View>
          <Header style = {styles.header}>
            <Left style = {styles.left}>
              {this.props.isHomeScreen == true? <Text></Text>:  <TouchableOpacity onPress = {this.props.onPressBack}> 
                                                                  <Image  style = {styles.leftIcon}
                                                                          source = {require("../images/leftIcon.png")}
                                                                  />
                                                                </TouchableOpacity> }
            </Left>  

            <Title style = {styles.title}>
              {this.state.titleName}
            </Title>

            <Right style = {{flex: 1}}>
              <TouchableOpacity onPress={this.props.onPressSearch} 
                                 >               
                <Image  style = {styles.searchIcon}
                        source = {require("../images/search.png")}
                />
              </TouchableOpacity>
            </Right>

            <Right style = {{flex: 1}}>
              <TouchableOpacity onPress={this.props.onPressBurgerMenu} 
                                 >               
                <Image  style = {styles.menuIcon}
                        source = {require("../images/menu-button.png")}
                        onPress = {()=> this.props.navigation.openDrawer()}
                />
              </TouchableOpacity>
            </Right>
          </Header>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  left: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  title: {
    flex: 7,
    color:'#3D8D94', 
    fontSize: 18,
    fontWeight: '500',
    paddingTop: 15,
    justifyContent: 'center',
    paddingLeft: 43,
  },
  right: {
    
  },
  header: {
    flexDirection: 'row',
    width: width,
    backgroundColor: "#FFFFFF",
    paddingTop: 15
  }, 
  leftIcon: {
    width: 24,
    height: 24,
    flexDirection: "row",
    justifyContent: 'center',
    marginLeft: 10,
  },
  searchIcon: {
    width: 26,
    height: 26,
    flexDirection: "column",
    justifyContent: 'center',
    marginRight: 20,
  },
  menuIcon: {
    paddingTop: 19,
    width: 27,
    height: 27,
    flexDirection: "column",
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default AppHeader;
