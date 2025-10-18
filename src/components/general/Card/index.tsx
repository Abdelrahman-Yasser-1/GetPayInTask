import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
} from 'react-native';
import styles from './styles.style';
import { useAppTheme } from '@src/theme';

interface ICardProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Card = ({ onPress, style, children }: ICardProps) => {
  const { theme } = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      <View style={StyleSheet.compose(styles(theme).container, style)}>
        {children}
      </View>
    </Pressable>
  );
};

export default Card;
