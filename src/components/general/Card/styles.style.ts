import { boxShadow, gutters, layout } from '@src/common';
import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      backgroundColor: theme.cardBackground,
      // shadowColor: theme.gray400,
      ...boxShadow('md'),
      ...gutters.padding_12,
      ...layout.overflowHidden,
    },
  });

export default styles;
