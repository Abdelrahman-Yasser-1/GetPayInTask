import { StyleSheet } from 'react-native';
import { px, layout } from '@src/common';
import { Theme } from '@src/types';
import { IconButtonVariants } from '.';

export default (theme: Theme, variant: IconButtonVariants = 'default') => {
  const iconButtonBackground = {
    default: theme.defaultIconButtonBackground,
    whiteFaded: theme.whiteFadedIconButtonBackground,
    blackFaded: theme.blackFadedIconButtonBackground,
    transparent: 'transparent',
  };
  return StyleSheet.create({
    stackContainer: {
      ...layout.row,
    },
    iconButton: {
      borderRadius: px(4),
      backgroundColor: iconButtonBackground[variant],
      width: px(32),
      aspectRatio: 1,
      ...layout.allCenter,
    },
    logo: {
      width: px(105),
      height: px(36),
    },
  });
};
