import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Text from '../Text';
import { useAppTheme } from '@src/theme';
import styles from './style';

export type NavigationHeaderVariant = 'default' | 'transparent';

export interface INavigationHeaderProps {
  title?: string;
  subtitle?: string;
  startAction?: ReactNode;
  endAction?: ReactNode;
  variant?: NavigationHeaderVariant;
}

const NavigationHeader = ({
  title,
  subtitle,
  startAction,
  endAction,
  variant = 'default',
}: INavigationHeaderProps) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles(theme, variant).container}>
      <View style={styles(theme, variant).startContainer}>{startAction}</View>
      {(title || subtitle) && (
        <View style={styles(theme, variant).centerContainer}>
          {title && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              textSize="size_14"
              fontWight="semiBold"
              textHeight="hight_20"
              color={variant === 'transparent' ? 'alphaWhite' : 'defaultText'}
              textAlign="center"
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              textSize="size_12"
              textHeight="hight_18"
              textAlign="center"
              color={variant === 'transparent' ? 'gray100' : 'gray500'}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
      <View style={styles(theme, variant).endContainer}>{endAction}</View>
    </View>
  );
};

export default NavigationHeader;
