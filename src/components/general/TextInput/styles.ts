import appFonts from '@src/assets/fonts';
import { fonts, gutters, layout, px } from '@src/common';
import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';
import { TInputVariant } from '.';
import { getVariantStyle } from './utils';
import { isArabic } from '@src/translation';

const styles = (theme: Theme, variant: TInputVariant = 'default') => {
  const variantStyle = getVariantStyle(theme, variant);

  return StyleSheet.create({
    container: {
      ...layout.col,
      ...gutters.gap_4,
    },
    labelContainer: {
      ...layout.row,
      ...gutters.gap_4,
      ...layout.itemsCenter,
    },
    startIcon: {
      marginVertical: 'auto',
      ...gutters.paddingStart_16,
      marginRight: -px(10),
    },
    endIcon: {
      marginVertical: 'auto',
      ...gutters.paddingLeft_16,
      ...gutters.marginRight_16,
    },
    inputContainer: {
      ...layout.row,
      ...gutters.gap_16,
      ...layout.overflowHidden,
      borderWidth: px(1),
      borderRadius: px(4),
      borderColor: variantStyle.inputContainerBorderColor,
    },
    focusInputContainer: {
      backgroundColor:
        variant === 'transparent'
          ? theme.alphaBlack40
          : theme.focusedInoutBackground,
      borderColor:
        variant === 'transparent' ? theme.alphaWhite : theme.inputBorder,
    },
    errorInputContainer: {
      borderColor: theme.error700,
    },
    suffixContainer: {
      backgroundColor:
        variant === 'disabled' ? theme.gray200 : theme.focusedInoutBackground,
      ...gutters.paddingHorizontal_16,
      ...layout.allCenter,
      ...layout.row,
      ...layout.justifyBetween,
      ...gutters.gap_6,
    },
    input: {
      textAlignVertical: 'top',
      ...layout.flex_1,
      ...fonts.sizes.size_16,
      ...gutters.paddingVertical_8,
      ...gutters.paddingHorizontal_8,
      fontFamily: appFonts.regular,
      color: variantStyle.inputTextColor,
      backgroundColor: 'transparent',
      writingDirection: isArabic ? 'rtl' : 'ltr',
      textAlign: isArabic ? 'right' : 'left',
    },
    indicator: {
      ...layout.selfCenter,
      height: px(2),
      marginTop: -px(2),
      backgroundColor: variantStyle.indicatorColor,
    },
    errorIndicator: {
      backgroundColor: theme.error700,
    },
    textMsgContainer: {
      ...layout.row,
      ...gutters.gap_12,
      ...layout.itemsCenter,
    },
  });
};

export default styles;
