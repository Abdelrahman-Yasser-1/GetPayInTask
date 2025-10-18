import { StyleSheet } from 'react-native';
import { TButtonVariant } from '.';
import { Theme } from '@src/types';
import { gutters, layout } from '@src/common';
import { getVariantStyle } from './Button.utils';

export default (
  variant: TButtonVariant,
  theme: Theme,
  pressed?: boolean,
  size?: 'large' | 'medium' | 'small' | 'default',
  isDisable?: boolean,
) => {
  const sizeStyles = {
    large: {
      ...gutters.padding_16,
    },
    medium: {
      ...gutters.padding_12,
    },
    small: {
      ...gutters.padding_8,
    },
    default: {
      ...gutters.padding_12,
    },
  };

  const variantStyle = getVariantStyle(theme, variant);

  return StyleSheet.create({
    container: {
      backgroundColor: isDisable
        ? variantStyle.disabledBackground
        : pressed
        ? variantStyle.pressedBackground
        : variantStyle.background,
      borderColor: isDisable
        ? variantStyle.borderDisabled
        : variantStyle.border,
      borderWidth: 1,
      borderRadius: 4,
      ...layout.row,
      ...layout.itemsCenter,
      ...layout.justifyCenter,
      ...sizeStyles[size ?? 'default'],
      ...gutters.gap_4,
    },
    title: {
      color: isDisable
        ? variantStyle.disabledText
        : pressed
        ? variantStyle.pressedText
        : variantStyle.text,
    },
  });
};
