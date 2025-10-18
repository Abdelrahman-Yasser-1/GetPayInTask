import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';
import { gutters, layout, px } from '@src/common';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    flatListContent: {
      padding: px(16),
      paddingBottom: px(100), // Extra padding for bottom tabs
    },
    row: {
      justifyContent: 'space-between',
    },
    productItem: {
      flex: 1,
      marginHorizontal: px(4),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...gutters.paddingVertical_32,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...gutters.paddingVertical_32,
      ...gutters.paddingHorizontal_16,
    },
  });
