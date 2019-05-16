// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// class HomeScreen2 extends Component {
//     static navigationOptions = {
//         drawerLabel: 'Home',
//         drawerIcon: ({ tintColor }) => (
//           <Image
//             source={require('../assets/icon.png')}
//             style={[styles.icon, {tintColor: tintColor}]}
//           />
//         ),
//       };
    
//       render() {
//         return (
//           <Button
//             onPress={() => this.props.navigation.navigate('Notifications')}
//             title="Go to notifications"
//           />
//         );
//       }
//     }
    
//     class MyNotificationsScreen extends React.Component {
//       static navigationOptions = {
//         drawerLabel: 'Notifications',
//         drawerIcon: ({ tintColor }) => (
//           <Image
//             source={require('../assets/icon.png')}
//             style={[styles.icon, {tintColor: tintColor}]}
//           />
//         ),
//       };
    
//       render() {
//         return (
//           <Button
//             onPress={() => this.props.navigation.goBack()}
//             title="Go back home"
//           />
//         );
//       }
//     }
    
//     const styles = StyleSheet.create({
//       icon: {
//         width: 24,
//         height: 24,
//       },
//     });
    
//     const MyDrawerNavigator = createDrawerNavigator({
//       Home: {
//         screen: MyHomeScreen,
//       },
//       Notifications: {
//         screen: MyNotificationsScreen,
//       },
//     });
    
//     const MyApp = createAppContainer(MyDrawerNavigator);

// export default HomeScreen2;
