import React, { PropsWithChildren, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@src/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { storeData } from '@src/common';
import { MMKV_KEYS } from '@src/common/enum';
import { navigationRef } from '@src/navigation/navigationUtils';
import { ThemeProvider } from '@src/theme';
import { Toast } from '@src/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { queryClient } from '@src/services/queryClient';

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  const routeNameRef = useRef<string | undefined>(undefined);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeNameRef.current =
                  navigationRef?.current?.getCurrentRoute()?.name;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef?.current;
                const currentRouteName =
                  navigationRef?.current?.getCurrentRoute()?.name;
                storeData(MMKV_KEYS.PREV_SCREEN_NAME, previousRouteName);

                if (previousRouteName !== currentRouteName) {
                  storeData(MMKV_KEYS.SCREEN_NAME, currentRouteName);
                }
                routeNameRef.current = currentRouteName;
              }}
            >
              <GestureHandlerRootView>{children}</GestureHandlerRootView>
            </NavigationContainer>
            <Toast />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default ProviderWrapper;
