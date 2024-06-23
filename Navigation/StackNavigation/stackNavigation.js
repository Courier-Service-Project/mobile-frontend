import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../../custom_modules/screens/loginScreen';
import ResetPassword from '../../custom_modules/screens/resetPasswordScreen';
import ForgotPasswordScreen3 from '../../custom_modules/screens/ForgotPassword/forgotPasswordScreen3';
import ForgotPasswordScreen1 from '../../custom_modules/screens/ForgotPassword/forgotPasswordScreen1';
import ForgotPasswordScreen2 from '../../custom_modules/screens/ForgotPassword/forgotPasswordScreen2';
import BottomTabNavigator from '../BottomTabNavigation/bottomTabNavigation';
import AppHeader from '../../custom_modules/components/appHeader';
import OrderDetailsScreen from '../../custom_modules/screens/OrderDetailsScreen';
import StatusUpdateScreen from '../../custom_modules/screens/StatusUpdateScreen';
import CalculatePriceScreen1 from '../../custom_modules/screens/calculatePrice/CalculatePriceScreen1';
import CalculatePriceScreen2 from '../../custom_modules/screens/calculatePrice/CalculatePriceScreen2';
import ChangeNameScreen from '../../custom_modules/screens/profile/changeNameScreen';
import ChangeEmailScreen from '../../custom_modules/screens/profile/changeEmailScreen';
import ChangeMobileScreen from '../../custom_modules/screens/profile/changeMobileScreen';
import ChangeDOBScreen from '../../custom_modules/screens/profile/changeDOB';
import ChangeGenderScreen from '../../custom_modules/screens/profile/changeGenderScreen';
import PerformanceScreen from '../../custom_modules/screens/performanceScreen';

const stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <stack.Screen name="Login" component={Login}></stack.Screen>
      <stack.Screen
        name="ResetPassword"
        component={ResetPassword}></stack.Screen>
      <stack.Screen
        name="ForgotPasswordScreen1"
        component={ForgotPasswordScreen1}></stack.Screen>
      <stack.Screen
        name="ForgotPasswordScreen2"
        component={ForgotPasswordScreen2}></stack.Screen>
      <stack.Screen
        name="ForgotPasswordScreen3"
        component={ForgotPasswordScreen3}></stack.Screen>
      <stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{header: () => <AppHeader />}}></stack.Screen>

      <stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}></stack.Screen>

      <stack.Screen
        name="StatusUpdateScreen"
        component={StatusUpdateScreen}></stack.Screen>

      <stack.Screen
        name="CalculatePriceScreen1"
        component={CalculatePriceScreen1}></stack.Screen>

      <stack.Screen
        name="CalculatePriceScreen2"
        component={CalculatePriceScreen2}></stack.Screen>

      <stack.Screen
        name="ChangeNameScreen"
        component={ChangeNameScreen}></stack.Screen>

      <stack.Screen
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}></stack.Screen>

      <stack.Screen
        name="ChangeMobileScreen"
        component={ChangeMobileScreen}></stack.Screen>

      <stack.Screen
        name="ChangeDOBScreen"
        component={ChangeDOBScreen}></stack.Screen>

      <stack.Screen
        name="ChangeGenderScreen"
        component={ChangeGenderScreen}></stack.Screen>

<stack.Screen
        name="PerformanceScreen"
        component={PerformanceScreen}></stack.Screen>
    </stack.Navigator>
  );
};
export default StackNavigation;
