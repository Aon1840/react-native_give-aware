import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
// import HomeScreen2 from '../screens/HomeScreen2';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ListPostScreen from '../screens/ListPostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreatePostScreen from '../screens/CreatPostScreen';

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Register: {
            screen: RegisterScreen,
        },
    },
        {
            drawerPosition: 'right'
        }
    );

const AppNavigator = createStackNavigator(
    {
        Hamburger:{
            screen: DrawerNavigator
        },
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
    },
    {
        initialRouteName: "ListPost"
    }
);

AppNavigator.navigationOptions = {
    header: null,
    headerMode: null,
}
DrawerNavigator.navigationOptions = {
    header: null,
    headerMode: null,
} 

// const AppContainer = createAppContainer(DrawerNavigator);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;