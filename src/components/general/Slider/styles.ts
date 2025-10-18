import { StyleSheet } from 'react-native';

import { px } from '@src/common';
import { Theme } from '@src/types';
import { gutters, layout } from '@src/common';

export default (theme: Theme, activeColor?: string, inActiveColor?: string) =>
  StyleSheet.create({
    paginationContainer: {
      ...gutters.marginBottom_64,
      ...layout.row,
      ...layout.justifyCenter,
    },
    dot: {
      borderRadius: px(5),
      ...gutters.marginEnd_8,
    },
    activeDot: {
      backgroundColor: activeColor ?? theme.alphaWhite,
      width: px(40),
      height: px(4),
    },
    inactiveDot: {
      width: px(16),
      height: px(4),
      backgroundColor: inActiveColor ?? theme.success600,
    },
  });
