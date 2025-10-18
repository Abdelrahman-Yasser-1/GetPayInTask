import { TextStyle } from 'react-native';
import { config, lineHeights } from './config';
import { FontHights, FontSizes } from '@src/types';

export const staticFontStyles = {
  bold: {
    fontWeight: 'bold',
  },
  semiBold: {
    fontWeight: '600',
  },
  medium: {
    fontWeight: '500',
  },
  regular: {
    fontWeight: '400',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  alignCenter: {
    textAlign: 'center',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
} as const satisfies Record<string, TextStyle>;

export const unitMeasurement = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

//NOTE: if u have any new font size all u need to do is add the size into fontSizes array from config file
export const generateFontSizes = () =>
  config.fontSize.reduce(
    (acc, size) =>
      Object.assign(acc, {
        [`size_${size}`]: {
          fontSize: size,
        },
      }),
    {} as FontSizes,
  );

export const generateFontHights = () =>
  lineHeights.reduce(
    (acc, size) =>
      Object.assign(acc, {
        [`hight_${size}`]: {
          lineHeight: size,
        },
      }),
    {} as FontHights,
  );
export type TAppFontsSize = keyof typeof fonts.sizes;
export type TAppFontsHeight = keyof typeof fonts.heights;

export const fonts = {
  sizes: { ...generateFontSizes() },
  styles: { ...staticFontStyles },
  heights: {
    ...generateFontHights(),
  },
};
