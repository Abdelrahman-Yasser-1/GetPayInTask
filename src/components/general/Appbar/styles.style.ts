import { fonts, gutters, layout, px } from '@src/common';
import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.padding_16,
      backgroundColor: theme.background,
      shadowOffset: {
        width: px(0),
        height: px(12),
      },
      shadowOpacity: 0.58,
      shadowRadius: 0.5,
      elevation: 5,
      ...gutters.marginBottom_12,
    },
    title: {
      ...layout.flex_1,
      ...fonts.sizes.size_24,
      ...gutters.marginHorizontal_16,
      ...fonts.styles.alignCenter,
      color: theme.displayText,
    },
  });
