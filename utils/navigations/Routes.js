import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import EmergencyDetails from '../../screens/EmergencyDetails';
import SignInScreen from '../../screens/auth/SignInScreen';
import SignIn from '../../screens/auth/SignIn';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import Welcome from '../../screens/auth/Welcome';
import FamilyFriends from '../../screens/auth/FamilyFriends';
import SplashScreen from '../../screens/SplashScreen';
const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
      <RootStack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
      <RootStack.Screen name="FamilyFriends" options={{ headerShown: false }} component={FamilyFriends} />
      <RootStack.Screen name="SignUpScreen" options={{ headerShown: false }} component={SignUpScreen} />
      <RootStack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
      <RootStack.Screen name="SignInScreen" options={{ title: 'Login', headerShown: false }} component={SignInScreen} />
    </RootStack.Navigator>
  )
}


export default RootStackScreen;

export const authStack = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen options={{ headerShown: false, headerStyle: { backgroundColor: '#FF6347' } }} name="EmergencyDetails" component={EmergencyDetails} />

    </RootStack.Navigator>
  )
}