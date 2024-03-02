import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import StackNavigation from "./Navigation/StackNavigation/stackNavigation.js";


const stack=createNativeStackNavigator();
const App=()=>{
  return(
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>   
  )
}

export default App