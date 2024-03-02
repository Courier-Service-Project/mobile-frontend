import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../../custom_modules/screens/homeScreen";
import ProfileScreen from "../../custom_modules/screens/profileScreen";
import TopBarNavigation from "../TopTabNavigation/topTabNavigation";


const bottomTab=createBottomTabNavigator()
const BottomTabNavigator=()=>{
    return(
        <bottomTab.Navigator initialRouteName="HomeScreen">
            <bottomTab.Screen name='HomeScreen' component={HomeScreen}></bottomTab.Screen>
            <bottomTab.Screen name='TopBarNavigation' component={TopBarNavigation}></bottomTab.Screen>
            <bottomTab.Screen name='ProfileScreen' component={ProfileScreen}></bottomTab.Screen>
        </bottomTab.Navigator>
    )
}

export default BottomTabNavigator;