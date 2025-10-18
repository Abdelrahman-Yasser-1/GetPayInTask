import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './styles.style';
import { useAppTheme } from '@src/theme';

interface IAppbarProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

const Appbar = ({
  title,
  leftIcon,
  rightIcon,
  onLeftIconPress: onLeftPress,
  onRightIconPress: onRightPress,
}: IAppbarProps) => {
  const { theme } = useAppTheme();
  return (
    <View style={styles(theme).container}>
      {leftIcon && <Pressable onPress={onLeftPress}>{leftIcon}</Pressable>}
      <Text style={styles(theme).title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      {rightIcon && <Pressable onPress={onRightPress}>{rightIcon}</Pressable>}
    </View>
  );
};

export default Appbar;
