import { createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AppNavigator = createStackNavigator(
    {
       Home: {
           screen: HomeScreen
       },
       Login: {
           screen: LoginScreen
       },
       Register: {
           screen: RegisterScreen
       }
    },
    {
       initialRouteName: "Login"
    }
   ) ;

AppNavigator.navigationOptions = {
    header: null,
}

const AppContainer = createAppContainer(AppNavigator) ;

export default AppContainer ;