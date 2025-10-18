import { StyleSheet } from 'react-native';
import { gutters, layout, px, pxH } from '@src/common';
import { Theme } from '@src/types';
import { NavigationHeaderVariant } from '.';

export default (theme: Theme, variant: NavigationHeaderVariant) =>
  StyleSheet.create({
    container: {
      ...layout.row,
      ...layout.itemsCenter,
      ...layout.justifyBetween,
      ...gutters.paddingHorizontal_12,
      ...gutters.paddingVertical_8,
      borderBottomWidth: pxH(1),
      backgroundColor:
        variant === 'transparent' ? 'transparent' : theme.background,
      borderBottomColor:
        variant === 'transparent'
          ? 'transparent'
          : theme.navigationHeaderBorder,
      minHeight: px(48),
    },
    startContainer: {
      ...layout.flex_1,
      ...layout.itemsStart,
    },
    centerContainer: {
      flex: 2,
      ...layout.col,
      ...gutters.gap_4,
    },
    endContainer: {
      ...layout.flex_1,
      ...layout.itemsEnd,
    },
  });
