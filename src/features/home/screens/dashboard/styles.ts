import { gutters, layout } from '@src/common';
import { StyleSheet } from 'react-native';
import { px } from '@src/common';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    categoriesSection: {
      ...gutters.marginVertical_16,
      ...gutters.paddingHorizontal_16,
      maxHeight: px(60),
    },
    categoriesContainer: {
      ...gutters.paddingRight_16,
      ...layout.itemsCenter,
    },
    categoryChip: {
      ...gutters.marginRight_8,
    },
    headerSection: {
      ...gutters.paddingVertical_20,
      ...gutters.marginBottom_16,
    },
    flatListContent: {
      ...gutters.paddingBottom_20,
      ...gutters.paddingHorizontal_16,
    },
    row: {
      ...layout.justifyBetween,
      ...gutters.paddingHorizontal_4,
    },
    productItem: {
      ...layout.flex_1,

      ...gutters.marginHorizontal_4,
      ...gutters.marginBottom_16,
    },
    loadingContainer: {
      ...layout.flex_1,

      ...layout.justifyCenter,

      ...layout.allCenter,
      ...gutters.paddingVertical_40,
    },
    emptyContainer: {
      ...layout.flex_1,
      ...layout.allCenter,
      ...gutters.paddingVertical_40,
    },
  });
