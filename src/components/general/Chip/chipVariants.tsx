import { Theme } from '@src/types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { px, TAppFontsHeight, TAppFontsSize } from '@src/common';
import { IconName } from '../Icon';

export type TChipVariants = 'warning' | 'info' | 'success' | 'error' | 'grey';
type TTagIconsType = 'check';
export type TTagSizes = 'large' | 'medium' | 'small';

export interface IChipProps {
  /**
   * @prop Chip size, only for Tags
   */
  size?: TTagSizes;
  /**
   * @prop label: Chip text, send it translated
   */
  label: string;
  /**
   * @prop variants: @TChipVariants control the chip styles,
   * 'warning' | 'info' | 'success' | 'error' | 'grey';
   */
  variants: TChipVariants;
  /**
   * @prop iconType: To control the icons added to the tag, u can add your icon name here + getTagIcon function
   */
  iconType?: TTagIconsType;
  /**
   * @prop iconOnly: to show only the icon
   */
  iconOnly?: boolean;
  theme: Theme;
  onPress?: () => void;
  /**
   * @prop isRounded: to give it around edges
   */
  isRounded?: boolean;
  iconName?: IconName;
}

export const chipOptions: Record<
  TChipVariants,
  {
    borderColor: keyof Theme;
    backgroundColor: keyof Theme;
    textColor: keyof Theme;
  }
> = {
  error: {
    borderColor: 'error50',
    backgroundColor: 'error50',
    textColor: 'error800',
  },
  grey: {
    borderColor: 'gray200',
    backgroundColor: 'gray50',
    textColor: 'gray800',
  },
  info: {
    borderColor: 'info200',
    backgroundColor: 'info50',
    textColor: 'info800',
  },
  success: {
    borderColor: 'success200',
    backgroundColor: 'success50',
    textColor: 'success800',
  },
  warning: {
    borderColor: 'warning200',
    backgroundColor: 'warning50',
    textColor: 'warning800',
  },
};

export const getTagIcon = (iconType: TTagIconsType, color: string) =>
  ({
    check: <FontAwesomeIcon name="check" color={color} size={px(16)} />,
  }[iconType]);

export const tagSizes: Record<
  TTagSizes,
  { textHeight: TAppFontsHeight; textSize: TAppFontsSize; hight: number }
> = {
  large: {
    textHeight: 'hight_24',
    textSize: 'size_16',
    hight: px(32),
  },
  medium: {
    textHeight: 'hight_24',
    textSize: 'size_16',
    hight: px(32),
  },
  small: {
    textHeight: 'hight_18',
    textSize: 'size_12',
    hight: px(24),
  },
};
