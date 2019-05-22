import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
// import HomeScreen2 from '../screens/HomeScreen2';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ListPostScreen from '../screens/ListPostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreatePostScreen from '../screens/CreatPostScreen';
import MyPostScreen from '../screens/MyPostScreen';
import MyPostScreen2NoUse from '../screens/MyPostScreen2';

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
        ListPost: {
            screen: ListPostScreen
        },
        CreatePost: {
            screen: CreatePostScreen
        },
        PostDetail: {
            screen: PostDetailScreen
        },
        MyPost: {
            screen: MyPostScreen
        },
        test: {
            screen: MyPostScreen2NoUse
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