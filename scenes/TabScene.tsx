import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FirebaseListScene from './FirebaseListScene';


const Tab = createMaterialBottomTabNavigator();

export const TabScene = () => {
  return (
    <Tab.Navigator
      initialRouteName="Games"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Games"
        component={FirebaseListScene}
        options={{
          tabBarIcon: 'gamepad-variant',
        }}
        initialParams={{collectionName: "games"}}
      />
      <Tab.Screen
        name="Movies"
        component={FirebaseListScene}
        options={{
          tabBarIcon: 'movie',
        }}
        initialParams={{collectionName: "movies"}}
      />
      <Tab.Screen
        name="Books"
        component={FirebaseListScene}
        options={{
          tabBarIcon: 'book',
        }}
        initialParams={{collectionName: "books"}}
      />
    </Tab.Navigator>
  );
};