import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useUserInteractionTracker } from '@src/common/hooks/useUserInteractionTracker';

interface UserInteractionWrapperProps {
  children: React.ReactNode;
}

/**
 * Centralized wrapper component that captures user interactions
 * and resets the auto-lock timer when users interact with the app
 *
 * Uses a simple wrapper that doesn't interfere with normal app interactions
 */
const UserInteractionWrapper: React.FC<UserInteractionWrapperProps> = ({
  children,
}) => {
  // Initialize the interaction tracker
  useUserInteractionTracker();

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserInteractionWrapper;
