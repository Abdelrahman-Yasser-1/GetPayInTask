import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';
import { gutters, layout } from '@src/common';

export default (theme: Theme) =>
  StyleSheet.create({
    // Chip variant styles
    chipContainer: {
      backgroundColor: theme.gray100,
      borderRadius: Number.MAX_SAFE_INTEGER,
      ...gutters.paddingHorizontal_12,
      ...gutters.paddingVertical_8,
      ...gutters.marginRight_8,
      ...gutters.marginBottom_8,
      borderWidth: 1,
      borderColor: theme.gray200,
      ...layout.row,
      ...layout.itemsCenter,
    },
    selectedChip: {
      backgroundColor: theme.SA600,
      borderColor: theme.SA600,
    },
  });
