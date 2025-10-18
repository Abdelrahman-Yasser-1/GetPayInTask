import { useCallback } from 'react';
import { useAutoLock } from './useAutoLock';

/**
 * Hook to track user interactions and reset the auto-lock timer
 * This hook provides a simple way to track interactions without
 * interfering with normal app functionality
 */
export const useUserInteractionTracker = () => {
  const { trackUserInteraction } = useAutoLock();

  const handleUserInteraction = useCallback(() => {
    trackUserInteraction();
  }, [trackUserInteraction]);

  return {
    handleUserInteraction,
  };
};
