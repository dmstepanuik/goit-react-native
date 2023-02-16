import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationScreen from './screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import mainTab from './variables/mainTab';
import { Text } from 'react-native';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import CreatePostsScreen from './screens/CreatePostsScreen/CreatePostsScreen';
import PostsScreen from './screens/PostsScreen/PostsScreen';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  const AuthStack = createStackNavigator();
  const MainTab = createBottomTabNavigator();
  console.log(isAuth);

  return (
    <NavigationContainer>
      {!isAuth && (
        <AuthStack.Navigator>
          <AuthStack.Screen options={{ headerShown: false }} name="register">
            {() => <RegistrationScreen setIsAuth={setIsAuth} />}
          </AuthStack.Screen>
          <AuthStack.Screen options={{ headerShown: false }} name="signIn">
            {() => <LoginScreen setIsAuth={setIsAuth} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      )}

      {isAuth && (
        <MainTab.Navigator
          initialRouteName="posts"
          screenOptions={mainTab.screenOptions}
        >

          <MainTab.Screen
            name="posts"
            component={PostsScreen}
            options={mainTab.options.getPosts(setIsAuth)}
          />

          <MainTab.Screen
            name="create"
            options={({ navigation }) =>
              mainTab.options.getPostCreation(navigation)
            }
          >
            {() => (
              <CreatePostsScreen
                imgUrl={require('./assets/images/posts/img01.jpg')}
              />
            )}
          </MainTab.Screen>
          <MainTab.Screen
            name="profile"
            component={ProfileScreen}
            options={mainTab.options.profile}
          />
        </MainTab.Navigator>
      )}
    </NavigationContainer>
  );
}
