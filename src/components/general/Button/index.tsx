import { Pressable, ActivityIndicator, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import { useAppTheme } from '@src/theme';
import { getLineHight, getTextSize, getVariantStyle } from './Button.utils';
import Text from '../Text';
import { px } from '@src/common';

export type TButtonVariant =
  | 'primaryBrand'
  | 'primaryNeutral'
  | 'secondarySolid'
  | 'secondaryOutline'
  | 'secondaryOutlineOnColor'
  | 'transparent'
  | 'destructivePrimary'
  | 'destructiveSecondary'
  | 'destructiveSecondaryOutline'
  | 'destructiveSecondarySubtle'
  | 'destructiveTransparent'
  | 'subtle'
  | 'whiteTransparent'
  | 'whiteSolid'
  | 'whiteOutline'
  | 'whiteSubtle';

export type TButtonSizes = 'large' | 'medium' | 'small';
export interface IButtonProps {
  title?: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisable?: boolean;
  variant?: TButtonVariant;
  size?: TButtonSizes;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
}

const Button = ({
  title,
  onPress,
  isDisable,
  isLoading,
  variant = 'primaryBrand',
  size,
  icon: Icon,
  iconPosition = 'left',
  style,
}: IButtonProps) => {
  const isBtnDisabled = isDisable || isLoading;
  const { theme } = useAppTheme();
  const [pressed, setPressed] = useState(false);

  const variantStyle = getVariantStyle(theme, variant);

  return (
    <Pressable
      accessibilityState={{ disabled: isDisable }}
      onPress={() => {
        !isBtnDisabled ? onPress() : undefined;
        setPressed(!pressed);
      }}
      style={({ pressed: isPressed }) => [
        styles(variant, theme, isPressed, size, isDisable).container,
        {
          flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
        },
        style,
      ]}
    >
      {Icon && (
        <View style={title ? { marginEnd: px(4) } : undefined}>{Icon}</View>
      )}
      {title && (
        <Text
          fontWight="medium"
          textSize={getTextSize(size ?? 'medium')}
          textHeight={getLineHight(size ?? 'medium')}
          style={styles(variant, theme, pressed, size, isDisable).title}
        >
          {title}
        </Text>
      )}
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={isDisable ? variantStyle.disabledIcon : variantStyle.iconColor}
        />
      ) : null}
    </Pressable>
  );
};
export default Button;
