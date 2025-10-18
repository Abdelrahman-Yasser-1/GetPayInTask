import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp } from '@src/features';
import { TAuthStackParamList } from './types';

const Stack = createStackNavigator<TAuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
export default AuthStack;
