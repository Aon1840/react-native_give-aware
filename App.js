import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './navigation/AppNavigation' 

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer/>
        {/* <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
