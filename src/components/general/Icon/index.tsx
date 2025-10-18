import * as LucideIcons from 'lucide-react-native';
import React from 'react';
import type { LucideProps } from 'lucide-react-native';
import type { ViewStyle } from 'react-native';
import { px } from '@src/common';
import { Theme } from '@src/types';
import { useAppTheme } from '@src/theme';

export type IconName = keyof typeof LucideIcons;

export interface IconProps extends Omit<LucideProps, 'ref' | 'color'> {
  name: IconName;
  size?: number;
  color?: keyof Theme;
  style?: ViewStyle;
  // rtlFlipEnabled?: boolean;
}

export default ({
  name,
  size = 24,
  color,
  style,
  // rtlFlipEnabled = true,
  ...props
}: Readonly<IconProps>) => {
  const { theme } = useAppTheme();
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps>;

  if (!LucideIcon) {
    console.warn(`Icon "${String(name)}" not found in Lucide icons`);
    return null;
  }

  return (
    <LucideIcon
      size={px(size)}
      color={color ? theme[color] : theme.iconDefault}
      style={style}
      {...props}
    />
  );
};
