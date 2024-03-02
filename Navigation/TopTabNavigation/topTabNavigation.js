import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import PendingScreen from "../../custom_modules/screens/ActivityTabScreens/pendingScreen";
import ToDoScreen from "../../custom_modules/screens/ActivityTabScreens/toDoScreen";
import OnGoingScreen from "../../custom_modules/screens/ActivityTabScreens/onGoingScreen";
import CompletedScreen from "../../custom_modules/screens/ActivityTabScreens/completedScreen";


const topTab=createMaterialTopTabNavigator()
const TopBarNavigation=()=>{
    return(
        <topTab.Navigator initialRouteName="PendingScreen">
            <topTab.Screen name='PendingScreen' component={PendingScreen}></topTab.Screen>
            <topTab.Screen name='ToDoScreen' component={ToDoScreen}></topTab.Screen>
            <topTab.Screen name='OnGoingScreen' component={OnGoingScreen}></topTab.Screen>
            <topTab.Screen name='CompletedScreen' component={CompletedScreen}></topTab.Screen>
        </topTab.Navigator>
    )
}
export default TopBarNavigation;