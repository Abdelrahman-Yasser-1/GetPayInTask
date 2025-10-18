import { gutters, px, layout } from '@src/common';
import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';

const styles = (theme: Theme, disabled?: boolean) =>
  StyleSheet.create({
    container: {
      ...gutters.paddingBottom_12,
    },
    content: {
      ...layout.row,
      ...layout.allCenter,
      ...gutters.gap_8,
      ...gutters.marginBottom_4,
    },
    selectedUnderline: {
      ...layout.selfCenter,
      width: '90%',
      height: px(3),
      borderRadius: Number.MAX_SAFE_INTEGER,
      backgroundColor: disabled ? theme.gray400 : theme.SA500,
    },
  });

export default styles;
