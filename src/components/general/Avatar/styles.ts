import appFonts from '@src/assets/fonts';
import { layout, px } from '@src/common';
import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';

export default (
  theme: Theme,
  backgroundColor?: string,
  isSquare?: boolean,
  size?: number,
  textColor?: string,
  noBorder?: boolean,
) =>
  StyleSheet.create({
    container: {
      borderRadius: isSquare ? 8 : 2000,
      ...layout.allCenter,
      backgroundColor: backgroundColor || theme.background,
      width: size && px(size),
      height: size && px(size),
      borderWidth: noBorder ? 0 : px(2),
      borderColor: theme.avatarBorder,
      ...layout.overflowHidden,
    },
    avatar: {
      ...layout.fullHeight,
      ...layout.fullWidth,
    },
    text: {
      fontSize: size && size * 0.4,
      textAlign: 'center',
      color: textColor || theme.primaryText,
      fontFamily: appFonts.regular,
    },
  });
