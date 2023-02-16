import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
// import CreatePostsScreen from './screens/CreatePostsScreen/CreatePostsScreen';
// import PostsScreen from './screens/PostsScreen/PostsScreen';
import RegistrationScreen from './screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
// import mainTab from './variables/mainTab';
import { Text } from 'react-native';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  const AuthStack = createStackNavigator();
  // const MainTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen options={{ headerShown: false }} name="register">
          {() => <RegistrationScreen setIsAuth={setIsAuth} />}
        </AuthStack.Screen>
        <AuthStack.Screen options={{ headerShown: false }} name="signIn">
          {() => <LoginScreen setIsAuth={setIsAuth} />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
