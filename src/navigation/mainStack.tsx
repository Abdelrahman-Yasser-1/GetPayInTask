import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TMainStackParamList } from './types';
import HomeBottomTabs from './homeBottomTabs';
import AuthStack from './authStack';
import { useNetworkStatus } from '@src/common/hooks';
// import { useUserInteractionTracker } from '@src/common/hooks/useUserInteractionTracker';

const Stack = createStackNavigator<TMainStackParamList>();

const MainStack = () => {
  useNetworkStatus();
  // useUserInteractionTracker(); // Track user interactions globally

  return (
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeStack" component={HomeBottomTabs} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
