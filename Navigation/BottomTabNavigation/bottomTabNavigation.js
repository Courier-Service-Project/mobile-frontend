import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../custom_modules/screens/homeScreen';
import ProfileScreen from '../../custom_modules/screens/profileScreen';
import TabStackNavigator from '../TopTabNavigation/topTabNavigation';
import {AppHeader} from '../../custom_modules/components/appHeader';

const bottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <bottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <bottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}></bottomTab.Screen>
      <bottomTab.Screen
        name="TabStackNavigator"
        component={TabStackNavigator}></bottomTab.Screen>
      <bottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{header: () => <AppHeader />}}></bottomTab.Screen>
    </bottomTab.Navigator>
  );
};

export default BottomTabNavigator;
