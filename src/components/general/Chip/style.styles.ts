import { gutters, layout, px } from '@src/common';
import { StyleSheet } from 'react-native';

export default (
  backgroundColor: string,
  borderColor?: string,
  isRounded?: boolean,
) =>
  StyleSheet.create({
    chipContainer: {
      height: px(32),
      backgroundColor,
      borderColor,
      borderWidth: borderColor ? 1 : 0,
      ...gutters.gap_8,
      ...layout.selfStart,
      ...layout.itemsCenter,
      ...layout.row,
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingVertical_8,
      //...layout.wrap,
      borderRadius: isRounded ? 999 : layout.borderRadiusChip.borderRadius,
    },
    tagContainer: {
      backgroundColor,
      borderColor,
      borderWidth: borderColor ? 1 : 0,
      ...gutters.paddingHorizontal_12,
      ...gutters.gap_4,
      ...layout.selfStart,
      ...layout.allCenter,
      ...layout.row,
      borderRadius: isRounded ? 999 : layout.borderRadiusChip.borderRadius,
    },
  });
