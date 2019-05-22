import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
// import HomeScreen2 from '../screens/HomeScreen2';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ListSellPostScreen from '../screens/ListSellPostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreatePostScreen from '../screens/CreatPostScreen';
import MySellPostScreen from '../screens/MySellPostScreen';
import MyDonatePostScreen from '../screens/MyDonatePostScreen';
import UpdatePostSellScreen from '../screens/UpdatePostSellScreen';
import UpdatePostDonateScreen from "../screens/UpdatePostDonateScreen";
import ListDonatePostScreen from '../screens/ListDonatePostScreen';

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
        },
        ListSellPost: {
            screen: ListSellPostScreen
        },
        ListDonatePost: {
            screen: ListDonatePostScreen
        },
        CreatePost: {
            screen: CreatePostScreen
        },
        PostDetail: {
            screen: PostDetailScreen
        },
        MySellPost: {
            screen: MySellPostScreen
        },
        UpdateSellPost: {
            screen: UpdatePostSellScreen
        },
        UpdateDonatePost: {
            screen: UpdatePostDonateScreen
        },
        MyDonatePost: {
            screen: MyDonatePostScreen
        }
    },
    {
        initialRouteName: "Login"
    }
);

AppNavigator.navigationOptions = {
    header: null,
    headerMode: null,
}

export default AppNavigator;