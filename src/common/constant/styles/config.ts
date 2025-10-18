import { ThemeConfiguration } from '@src/types';
import { colorsDark, colorsLight } from './colors';

const guttersSizes = [
  0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80,
] as const;
const fontSizes = [10, 12, 14, 16, 18, 20, 24, 30, 36, 40, 72] as const;
export const lineHeights = [
  14, 18, 20, 24, 28, 30, 32, 38, 44, 60, 72, 90,
] as const;

export const config = {
  gutters: guttersSizes,
  fontSize: fontSizes,
  fontLineHeights: lineHeights,
  theme: {
    light: {
      colors: colorsLight,
    },
    dark: {
      colors: colorsDark,
    },
  },
} as const satisfies ThemeConfiguration;
