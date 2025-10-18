import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAppDispatch } from './useApp';
import { useLocked } from '@src/store/selectors';
import { setLocked } from '@src/store/slices';

export const AUTO_LOCK_TIMEOUT = 10000; // 10 seconds

export const useAutoLock = () => {
  const dispatch = useAppDispatch();
  const isLocked = useLocked();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only set timer if app is not already locked
    if (!isLocked) {
      lastInteractionRef.current = Date.now();
      timeoutRef.current = setTimeout(() => {
        dispatch(setLocked(true));
      }, AUTO_LOCK_TIMEOUT);
    }
  }, [dispatch, isLocked]);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        dispatch(setLocked(true));
      } else if (nextAppState === 'active') {
        resetTimer();
      }
    },
    [dispatch, resetTimer],
  );

  const trackUserInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    // Set up app state listener
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Initial timer setup
    // resetTimer();

    // Cleanup
    return () => {
      subscription?.remove();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLocked, handleAppStateChange, resetTimer]);

  const unlockApp = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    dispatch(setLocked(false));
    // Reset timer after unlocking
    lastInteractionRef.current = Date.now();
    resetTimer();
  }, [dispatch, resetTimer]);

  return {
    resetTimer,
    unlockApp,
    trackUserInteraction,
    lastInteractionTime: lastInteractionRef.current,
  };
};
