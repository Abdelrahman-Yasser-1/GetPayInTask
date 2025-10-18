import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TDashboardParamList } from './types';
import Dashboard from '@src/features/home/screens/dashboard';
import CategoryScreen from '@src/features/home/screens/category';
import { ProductDetails } from '@src/features';

const Stack = createStackNavigator<TDashboardParamList>();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Category" component={CategoryScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);
export default DashboardStack;
