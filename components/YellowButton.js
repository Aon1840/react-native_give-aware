import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableHighlight } from "react-native";

class YellowButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonText: "",
      buttonWidth: 90,
      fontSize: 0,
      margin: null,
    };
  }

  getYellowButtonStyle = (width, margin) => {
    return {
      backgroundColor: "#F9A622",
      borderRadius: 30,
      width: width,
      height: 35,
      margin: margin === null? 5: margin,
      justifyContent: 'center',
    }
  }

  getTextStyle = (fontSize) => {
    return {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: fontSize == 0? 1: fontSize,
    }
  }

  render() {
    this.state.buttonText = "Default";
    console.log("message = " + this.props.message);

    if(this.props.message != ""){
      this.state.buttonText = this.props.message;
    }

    if(this.props.width != ""){
      
      this.state.buttonWidth = this.props.width;
      console.log("this.state.buttonWidth === " + this.state.buttonWidth);
    }

    if(this.props.fontSize != ""){
      this.state.fontSize = this.props.fontSize;
    }

    if(this.props.margin != ""){
      this.state.margin = this.props.margin;
    }

    return (
      <View>
        <TouchableHighlight onPress = {this.props._onPress}
                            style = {this.getYellowButtonStyle(this.state.buttonWidth, this.state.margin)}>
          <Text style = {this.getTextStyle(this.state.fontSize)}>
            {this.state.buttonText}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export default YellowButton;
