import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../custom_modules/screens/homeScreen';
import ProfileScreen from '../../custom_modules/screens/profileScreen';
import TabStackNavigator from '../TopTabNavigation/topTabNavigation';
import {AppHeader} from '../../custom_modules/components/appHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const bottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <bottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#20DED2',
        tabBarInactiveTintColor: '#044B55',
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '400',
        },
        tabBarStyle: {
          height: 50,
        },
      }}>
      <bottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}></bottomTab.Screen>
      <bottomTab.Screen
        name="Activities"
        component={TabStackNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome name="list-ul" color={color} size={size} />
          ),
        }}></bottomTab.Screen>
      <bottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <AppHeader />,
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}></bottomTab.Screen>
    </bottomTab.Navigator>
  );
};

export default BottomTabNavigator;
