import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabScene } from '../scenes/TabScene';
import SignInScene from '../scenes/SignInScene';




export const MainStack = () => {
const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="GoogleSignIn">
      <Stack.Screen
        name="GoogleSignIn"
        component={SignInScene}
        options={{ headerTitle: 'Sign In'  }}
      />
      <Stack.Screen
        name="Main"
        component={TabScene}
        options={{ headerTitle: 'Your collection' }}
      />
    </Stack.Navigator>
  );
};