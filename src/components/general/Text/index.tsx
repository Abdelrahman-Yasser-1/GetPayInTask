import {
  Text as ReactNativeText,
  StyleSheet,
  TextProps,
  TextStyle,
} from 'react-native';
import React from 'react';
import { fonts, TAppFontsHeight, TAppFontsSize } from '@src/common';
import { Theme } from '@src/types';
import { useAppTheme } from '@src/theme';
import appFonts from '@src/assets/fonts';

export interface ITextProps {
  testID?: string;
  /**
   * @prop `ellipsizeMode` When numberOfLines is set, this prop defines how the text will be truncated
   */
  ellipsizeMode?: TextProps['ellipsizeMode'];
  numberOfLines?: number;
  textAlign?: 'left' | 'right' | 'center';
  textSize?: TAppFontsSize;
  textHeight?: TAppFontsHeight;
  style?: TextStyle;
  color?: keyof Theme;
  fontWight?: keyof typeof appFonts;
  children: React.ReactNode;
}

const Text = ({
  children,
  color = 'primaryText',
  numberOfLines,
  ellipsizeMode,
  textAlign,
  textSize = 'size_16',
  textHeight = 'hight_32',
  style,
  fontWight = 'regular',
}: ITextProps) => {
  const { theme } = useAppTheme();

  return (
    <ReactNativeText
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      allowFontScaling={false}
      style={StyleSheet.flatten([
        {
          fontFamily: appFonts[fontWight],
          textAlign: textAlign ?? 'left',
          color: theme[color],
          ...fonts.sizes[textSize],
          ...fonts.heights[textHeight],
        },
        style,
      ])}
    >
      {children}
    </ReactNativeText>
  );
};

export default Text;
