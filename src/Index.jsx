import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from './screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import PostsCtx, { postsCtx } from './context/PostsCtx';
import { fontFamily } from './variables/fontFamily';
import LeftNavArrow from './components/svg/LeftNavArrow';
import MainTabNav from './Routing/MainTabNav';
import MapScreen from './screens/MapScreen/MapScreen';
import CommentsScreen from './screens/CommentsScreen/CommentsScreen';
import KeyboardContainer from './components/KeyboardContainer/KeyboardContainer';
import { useSelector } from 'react-redux';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const { currentUser } = useSelector(state => state.auth);

  const AuthStack = createStackNavigator();
  const OtherStack = createStackNavigator();

  return (
    <PostsCtx value={postsCtx}>
      <KeyboardContainer>
        <NavigationContainer>
          {!currentUser && (
            <AuthStack.Navigator>
              <AuthStack.Screen
                options={{ headerShown: false }}
                name="register"
              >
                {() => <RegistrationScreen setIsAuth={setIsAuth} />}
              </AuthStack.Screen>
              <AuthStack.Screen options={{ headerShown: false }} name="signIn">
                {() => <LoginScreen setIsAuth={setIsAuth} />}
              </AuthStack.Screen>
            </AuthStack.Navigator>
          )}

          {currentUser && (
            <OtherStack.Navigator screenOptions={mainOptions}>
              <OtherStack.Screen name="home" options={{ headerShown: false }}>
                {props => <MainTabNav {...props} setIsAuth={setIsAuth} />}
              </OtherStack.Screen>
              <OtherStack.Screen
                name="map"
                component={MapScreen}
                options={{ title: 'Map' }}
              />
              <OtherStack.Screen
                name="comments"
                component={CommentsScreen}
                options={{ title: 'Comments' }}
              />
            </OtherStack.Navigator>
          )}
        </NavigationContainer>
      </KeyboardContainer>
    </PostsCtx>
  );
}

const mainOptions = {
  headerTitleAlign: 'center',
  headerTintColor: '#212121',
  headerTitleStyle: {
    fontFamily: fontFamily.roboto500,
    fontSize: 17,
    lineHeight: 22,
  },
  headerStyle: {
    height: 88,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
  },
  headerLeft: props => <LeftNavArrow {...props} />,
};
