import { StyleSheet } from 'react-native';
import { gutters, px, layout } from '@src/common';
import { Theme } from '@src/types';
import { TContainerColor, TContainerVariant } from '.';

export default (
  theme: Theme,
  variant: TContainerVariant,
  containerColor?: TContainerColor,
  // isTranslucentStatusBar = false,
) =>
  StyleSheet.create({
    container: {
      ...layout.flex_1,
      backgroundColor: theme.background,
    },
    headerContainer: {
      // Safe area padding is now handled dynamically in the component
    },
    innerContainer: {
      backgroundColor:
        containerColor === 'default' ? theme.background : theme.grayBackground,
      ...layout.flex_1,
      ...containerVariantStyles[variant],
      flexGrow: 1,
    },
  });

// in case we need to add any special style for the container plz update the styles here
const containerVariantStyles = {
  container: {
    ...gutters.marginHorizontal_24,
    ...gutters.marginVertical_24,
  },
  stretched: {
    ...gutters.marginHorizontal_16,
  },
  none: {
    ...gutters.marginHorizontal_0,
  },
  normalView: {},
  roundedTop: {
    borderTopRightRadius: px(16),
    borderTopLeftRadius: px(16),
    ...layout.overflowHidden,
    top: -px(12),
  },
};
