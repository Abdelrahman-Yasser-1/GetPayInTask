import { StyleSheet } from 'react-native';
import { gutters, layout, px } from '@src/common';
import { Theme } from '@src/types';
import { TSelectBoxVariant, TSelectBoxState } from '.';

export default (
  theme: Theme,
  variant: TSelectBoxVariant,
  state: TSelectBoxState,
) => {
  // update this part to control the icon styles
  const stylesVariant = {
    'radio-box': {
      borderRadius: 999,
      disable: {
        backgroundColor: theme.background,
        borderColor: theme.gray400,
      },
      default: {
        backgroundColor: theme.background,
        borderColor: theme.gray500,
      },
      selected: {
        backgroundColor: theme.background,
        borderColor: theme.gray950,
      },
    },
    'check-box': {
      borderRadius: px(3),
      default: {
        backgroundColor: theme.background,
        borderColor: theme.gray500,
      },
      disable: {
        backgroundColor: theme.background,
        borderColor: theme.gray400,
      },
      selected: {
        backgroundColor: theme.iconPrimary,
        borderColor: theme.iconPrimary,
      },
    },
  };

  return StyleSheet.create({
    container: {
      ...gutters.gap_4,
      ...layout.fullWidth,
    },
    textMsgContainer: {
      ...layout.row,
      ...gutters.gap_16,
      ...layout.itemsStart,
      ...gutters.paddingVertical_4,
    },
    titleContainer: {
      ...layout.row,
      ...gutters.gap_16,
      ...layout.itemsStart,
    },
    iconBorder: {
      borderWidth: px(1),
      borderRadius: stylesVariant[variant].borderRadius,
      borderColor: stylesVariant[variant][state].borderColor,
      width: px(24),
      height: px(24),
      backgroundColor: stylesVariant[variant][state].backgroundColor,
      ...layout.allCenter,
    },
    icon: {
      borderRadius: 999,
      backgroundColor: stylesVariant['radio-box'][state].borderColor,
      width: px(16),
      height: px(16),
    },
  });
};
