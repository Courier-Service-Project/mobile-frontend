import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import PendingScreen from '../../custom_modules/screens/ActivityTabScreens/pendingScreen';
import ToDoScreen from '../../custom_modules/screens/ActivityTabScreens/toDoScreen';
import OnGoingScreen from '../../custom_modules/screens/ActivityTabScreens/onGoingScreen';
import CompletedScreen from '../../custom_modules/screens/ActivityTabScreens/completedScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppHeaderActivityTab} from '../../custom_modules/components/appHeader';

const topTab = createMaterialTopTabNavigator();
const stack = createNativeStackNavigator();
const TopBarNavigation = () => {
  return (
    <topTab.Navigator
      initialRouteName="PendingScreen"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 10,
          color: '#044B55',
          fontWeight: '500',
          marginLeft: 0,
        },
        tabBarActiveTintColor: '#044B55',
        tabBarAllowFontScaling: true,
        tabBarIndicatorStyle: {backgroundColor: '#044B55'},
      }}>
      <topTab.Screen name="Pending" component={PendingScreen}></topTab.Screen>
      <topTab.Screen name="To Do" component={ToDoScreen}></topTab.Screen>
      <topTab.Screen name="OnGoing" component={OnGoingScreen}></topTab.Screen>
      <topTab.Screen
        name="Completed"
        component={CompletedScreen}></topTab.Screen>
    </topTab.Navigator>
  );
};

const TabStackNavigator = () => {
  return (
    <stack.Navigator screenOptions={{header: () => <AppHeaderActivityTab />}}>
      <stack.Screen
        name="TopBarNavigation"
        component={TopBarNavigation}></stack.Screen>
    </stack.Navigator>
  );
};
export default TabStackNavigator;
