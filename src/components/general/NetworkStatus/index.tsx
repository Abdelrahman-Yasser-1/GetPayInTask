import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNetworkStatus } from '@src/common/hooks/useNetworkStatus';
import { Icon, Text } from '@src/components';
import { useAppTheme } from '@src/theme';
import { px } from '@src/common';

const NetworkStatus: React.FC = () => {
  const { isConnected } = useNetworkStatus();
  const { theme } = useAppTheme();

  if (isConnected) {
    return null; // Don't show anything when connected
  }

  return (
    <View style={styles(theme).container}>
      <Icon name="WifiOff" size={px(16)} color="alphaWhite" />
      <Text
        textSize="size_14"
        fontWight="medium"
        color="alphaWhite"
        style={styles(theme).text}
      >
        You're offline
      </Text>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.error500,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: px(8),
      paddingHorizontal: px(16),
      zIndex: 1000,
    },
    text: {
      marginLeft: px(8),
    },
  });

export default NetworkStatus;
