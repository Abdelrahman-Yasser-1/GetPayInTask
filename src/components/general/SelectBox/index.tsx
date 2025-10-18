import { Pressable, View } from 'react-native';
import React, { ReactElement } from 'react';
import Text from '../Text';
import Icon from '../Icon';
import { gutters, px } from '@src/common';
import styles from './styles.style';
import { useAppTheme } from '@src/theme';
import { layout } from '@src/common';

export type TSelectBoxVariant = 'radio-box' | 'check-box';
export type TSelectBoxState = 'selected' | 'disable' | 'default';
export interface ISelectBoxProps {
  text: string;
  subText?: string;
  value: string; // the value of the selected option
  isDisabled?: boolean;
  errorMsg?: string;
  isSelected?: boolean;
  /**
   * @prop the box variants to make the icon shape `radio-box` | `check-box`
   */
  variant: TSelectBoxVariant;
  onSelect: (value: string) => void;
  icon?: ReactElement;
}
/**
 *
 * @returns a component used in checkbox and the radio button component
 */
const SelectBox = ({
  text,
  subText,
  value,
  isSelected,
  isDisabled,
  errorMsg,
  variant,
  onSelect,
  icon,
}: ISelectBoxProps) => {
  const { theme } = useAppTheme();
  const buttonState: TSelectBoxState = isDisabled
    ? 'disable'
    : isSelected
    ? 'selected'
    : 'default';

  const getButtonIcon = () =>
    variant === 'check-box' ? (
      <View style={styles(theme, variant, buttonState).iconBorder}>
        {isSelected ? (
          <Icon name="Check" size={px(12)} color="alphaWhite" />
        ) : null}
      </View>
    ) : (
      <View style={styles(theme, variant, buttonState).iconBorder}>
        {isSelected ? (
          <View style={styles(theme, variant, buttonState).icon} />
        ) : null}
      </View>
    );

  return (
    <Pressable
      onPress={() => onSelect(value)}
      style={styles(theme, variant, buttonState).container}
      disabled={isDisabled}
    >
      <View style={styles(theme, variant, buttonState).titleContainer}>
        {getButtonIcon()}
        <View style={gutters.gap_8}>
          <View style={{ ...layout.row, ...gutters.gap_8 }}>
            {icon ?? null}
            <Text
              textSize="size_16"
              fontWight="regular"
              color={isDisabled ? 'gray400' : 'displayText'}
              textHeight="hight_24"
            >
              {text}
            </Text>
          </View>
          {subText ? (
            <Text
              color="secondaryParagraph"
              textSize="size_14"
              textHeight="hight_20"
            >
              {subText}
            </Text>
          ) : null}
        </View>
      </View>

      {errorMsg ? (
        <View style={styles(theme, variant, buttonState).textMsgContainer}>
          <Icon name="CircleAlert" color={'iconError'} size={px(20)} />
          <Text color="error700" textSize="size_14" textHeight="hight_20">
            {errorMsg}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
};

export default SelectBox;
