import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useAppTheme } from '@src/theme';

import styles from './styles';

type Props = {
  slidersCount: number;
  activeIndex: number;
  style?: ViewStyle;
  activeColor?: string;
  inActiveColor?: string;
};

const Slider = ({
  slidersCount,
  activeIndex,
  style,
  activeColor,
  inActiveColor,
}: Props) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles(theme).paginationContainer, style ?? {}]}>
      {Array.from({ length: slidersCount })?.map((_, index: number) => (
        <View
          key={index}
          style={[
            styles(theme, activeColor, inActiveColor).dot,
            activeIndex === index
              ? styles(theme, activeColor, inActiveColor).activeDot
              : styles(theme, activeColor, inActiveColor).inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

export default Slider;
