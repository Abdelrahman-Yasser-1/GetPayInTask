import { StyleSheet } from 'react-native';
import { layout, px, gutters } from '@src/common';
import boxShadow from '@src/common/constant/styles/shadows';
import { Theme } from '@src/types';
export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: px(8),
      ...gutters.padding_12,
      ...layout.col,
      ...gutters.gap_8,
      ...gutters.marginHorizontal_16,
      backgroundColor: theme.background,
      ...boxShadow('md'),
    },
    containerTitle: {
      ...gutters.padding_8,
    },
    listItemContainer: {
      ...layout.row,
      ...gutters.padding_8,
      gap: px(9),
      ...layout.allCenter,
    },
    listItemTitle: {
      ...layout.flex_1,
    },
  });
