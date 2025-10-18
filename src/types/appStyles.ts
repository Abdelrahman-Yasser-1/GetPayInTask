import { config } from '@src/common/constant/styles/config';
import {
  ArrayValue,
  RemoveAfterSeparator,
  RemoveBeforeSeparator,
  ToNumber,
} from './common';
import { staticGutterStyles } from '@src/common';
import { colorsDark, colorsLight } from '@src/common/constant/styles/colors';

type FontSizesKeys = `size_${ArrayValue<typeof config.fontSize>}`;
type FontHightsKeys = `hight_${ArrayValue<typeof config.fontLineHeights>}`;

export type FontSizes = {
  [key in FontSizesKeys]: {
    fontSize: ToNumber<RemoveBeforeSeparator<key>>;
  };
};

export type FontHights = {
  [key in FontHightsKeys]: {
    lineHight: ToNumber<RemoveBeforeSeparator<key>>;
  };
};

type Margins =
  | 'margin'
  | 'marginBottom'
  | 'marginTop'
  | 'marginRight'
  | 'marginLeft'
  | 'marginVertical'
  | 'marginHorizontal'
  | 'marginStart'
  | 'marginEnd';

type MarginKeys = `${Margins}_${ArrayValue<typeof config.gutters>}`;

type MarginGutters = {
  [key in MarginKeys]: {
    [K in Extract<RemoveAfterSeparator<key>, Margins>]: ToNumber<
      RemoveBeforeSeparator<key>
    >;
  };
};

type Paddings =
  | 'padding'
  | 'paddingBottom'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingLeft'
  | 'paddingVertical'
  | 'paddingHorizontal'
  | 'paddingStart'
  | 'paddingEnd';

type PaddingKeys = `${Paddings}_${ArrayValue<typeof config.gutters>}`;

type PaddingGutters = {
  [key in PaddingKeys]: {
    [K in Extract<RemoveAfterSeparator<key>, Paddings>]: ToNumber<
      RemoveBeforeSeparator<key>
    >;
  };
};

type Gaps = `gap_${ArrayValue<typeof config.gutters>}`;

type GapGutters = {
  [key in Gaps]: {
    gap: ToNumber<RemoveBeforeSeparator<key>>;
  };
};

export type Gutters = MarginGutters &
  PaddingGutters &
  GapGutters &
  typeof staticGutterStyles;

export type ThemeVariant = 'dark' | 'light';

export type FulfilledThemeConfiguration = {
  gutters: readonly number[];
  fontSize: readonly number[];
  fontLineHeights: readonly number[];
};

type TLightThemeColorKeys = keyof typeof colorsLight;
type TDarkThemeColorKeys = keyof typeof colorsDark;

// we may need these for the future
export type TLightTheme = { [K in TLightThemeColorKeys]: string };
export type TDarkTheme = { [K in TDarkThemeColorKeys]: string };

export type Theme = { [K in TLightThemeColorKeys]: string };

export type VariantThemeConfiguration = {
  colors: Theme;
};

export type ThemeConfiguration = FulfilledThemeConfiguration & {
  theme: {
    [K in ThemeVariant]: VariantThemeConfiguration;
  };
};
