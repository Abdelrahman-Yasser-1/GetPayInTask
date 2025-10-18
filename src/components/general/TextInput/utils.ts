import { Theme } from '@src/types';
import { TInputVariant } from '.';

export const getVariantStyle = (theme: Theme, variant: TInputVariant) =>
  ({
    default: {
      inputContainerBorderColor: theme.gray400,
      inputTextColor: theme.primaryText,
      indicatorColor: theme.inputBorder,
      placeholderTextColor: theme.gray500,
    },
    disabled: {
      inputContainerBorderColor: theme.gray400,
      inputTextColor: theme.gray400,
      indicatorColor: theme.inputBorder,
      placeholderTextColor: theme.gray400,
    },
    transparent: {
      inputContainerBorderColor: theme.alphaWhite,
      inputTextColor: theme.alphaWhite,
      indicatorColor: theme.alphaWhite,
      placeholderTextColor: theme.alphaWhite,
    },
    readOnly: {
      inputContainerBorderColor: theme.gray400,
      inputTextColor: theme.primaryText,
      indicatorColor: theme.inputBorder,
      placeholderTextColor: theme.gray1000,
    },
  }[variant]);
