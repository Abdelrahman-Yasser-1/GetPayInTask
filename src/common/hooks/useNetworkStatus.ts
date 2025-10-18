import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch } from './useApp';
import {
  useIsOffline,
  useIsOnline,
  useNetworkStatus as useNetworkStatusSelector,
  useConnectionType as useConnectionTypeSelector,
} from '@src/store/selectors';
import {
  setIsOffline,
  setIsOnline,
  setNetworkStatus,
  setConnectionType,
} from '@src/store/slices';
// import { useToast } from '@src/components';

export const useNetworkStatus = () => {
  // const { showSuccessToast, showErrorToast } = useToast();
  const dispatch = useAppDispatch();
  const isOffline = useIsOffline();
  const isOnline = useIsOnline();
  const networkStatus = useNetworkStatusSelector();
  const connectionType = useConnectionTypeSelector();

  const firstTimeRef = useRef(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected ?? false;
      const isInternetReachable = state.isInternetReachable;
      const type = state.type;

      // Determine network status based on connection and internet reachability
      let status: 'offline' | 'online' | 'unknown' = 'unknown';

      if (!isConnected) {
        status = 'offline';
      } else if (isConnected && isInternetReachable === true) {
        status = 'online';
      } else if (isConnected && isInternetReachable === false) {
        status = 'offline'; // Connected but no internet
      } else if (isConnected && isInternetReachable === null) {
        status = 'unknown'; // Connected but internet reachability unknown
      }

      // Update all network states
      dispatch(
        setIsOffline(
          !isConnected || (isConnected && isInternetReachable === false),
        ),
      );
      dispatch(setIsOnline(isConnected && isInternetReachable === true));
      dispatch(setNetworkStatus(status));
      dispatch(setConnectionType(type));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    // Skip showing toast on first launch
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }

    // Show toast only when network status actually changes
    // if (isOffline) {
    //   showErrorToast({
    //     message: 'No internet connection',
    //     isClosable: true,
    //     description: 'Please check your internet connection and try again.',
    //   });
    // } else if (networkStatus === 'online') {
    //   showSuccessToast({
    //     message: 'Internet connection restored',
    //     isClosable: true,
    //     description: 'You are now connected to the internet.',
    //   });
    // }
  }, [isOffline, networkStatus]);

  return {
    isOffline,
    isOnline,
    networkStatus,
    connectionType,
    isConnected: !isOffline,
    hasInternet: isOnline && networkStatus === 'online',
  };
};

// Hook for components that need to handle network status without toasts
export const useNetworkStatusSilent = () => {
  const dispatch = useAppDispatch();
  const isOffline = useIsOffline();
  const isOnline = useIsOnline();
  const networkStatus = useNetworkStatusSelector();
  const connectionType = useConnectionTypeSelector();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected ?? false;
      const isInternetReachable = state.isInternetReachable;
      const type = state.type;

      // Determine network status based on connection and internet reachability
      let status: 'offline' | 'online' | 'unknown' = 'unknown';

      if (!isConnected) {
        status = 'offline';
      } else if (isConnected && isInternetReachable === true) {
        status = 'online';
      } else if (isConnected && isInternetReachable === false) {
        status = 'offline'; // Connected but no internet
      } else if (isConnected && isInternetReachable === null) {
        status = 'unknown'; // Connected but internet reachability unknown
      }

      // Update all network states
      dispatch(
        setIsOffline(
          !isConnected || (isConnected && isInternetReachable === false),
        ),
      );
      dispatch(setIsOnline(isConnected && isInternetReachable === true));
      dispatch(setNetworkStatus(status));
      dispatch(setConnectionType(type));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return {
    isOffline,
    isOnline,
    networkStatus,
    connectionType,
    isConnected: !isOffline,
    hasInternet: isOnline && networkStatus === 'online',
  };
};
