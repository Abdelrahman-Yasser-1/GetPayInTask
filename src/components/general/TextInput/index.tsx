import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import {
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
  TextStyle,
  ViewStyle,
  PressableProps,
  Pressable,
} from 'react-native';
import Text from '../Text';
import { useAppTheme } from '@src/theme';
import styles from './styles';
import { px } from '@src/common';
import { Theme } from '@src/types';
import Icon, { IconName } from '../Icon';
import { getVariantStyle } from './utils';

export type TInputVariant = 'default' | 'transparent' | 'disabled' | 'readOnly';

export interface ITextInputProps extends TextInputProps {
  label?: string;
  subLabel?: string;
  startIconName?: IconName;
  endIconName?: IconName;
  onEndIconPress?: PressableProps['onPress'];
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  showHelperText?: boolean;
  errorMessage?: string;
  showError?: boolean;
  variant?: Extract<TInputVariant, 'default' | 'transparent'>;
  isSecureText?: boolean;
  onChangeText: (val: string) => void;
  prefix?: ReactElement;
  suffix?: string;
  labelStyle?: TextStyle;
  accessibilityTextInputLabel?: string;
  iconSize?: number;
  inputContainerStyle?: ViewStyle;
  isMobileNumber?: boolean;
}

const TextInput = ({
  label,
  startIconName,
  endIconName,
  onEndIconPress,
  required,
  disabled,
  errorMessage = '',
  helperText,
  showHelperText = true,
  showError = true,
  value,
  keyboardType = 'default',
  variant = 'default',
  isSecureText,
  onChangeText,
  onFocus,
  onBlur,
  prefix,
  suffix,
  style: inputStyle,
  labelStyle,
  iconSize = 14,
  inputContainerStyle,
  subLabel,
  accessibilityTextInputLabel,
  readOnly,
  isMobileNumber,
  ...rest
}: ITextInputProps) => {
  const { theme } = useAppTheme();

  const [isFocused, setIsFocused] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);
  const isError = errorMessage?.length > 0;
  const textVariant: TInputVariant = useMemo(
    () => (disabled ? 'disabled' : readOnly ? 'readOnly' : variant),
    [disabled, variant, readOnly],
  );

  const style = useMemo(() => styles(theme, textVariant), [theme, textVariant]);

  const handleOnChangeText = useCallback(
    (text: string) => {
      if (onChangeText) {
        //to disable 0 at the first number
        if (isMobileNumber && text.length === 1 && text === '0')
          onChangeText('');
        else onChangeText(text);
      }
      // setIsTyping(text.length > 0);
    },
    [isMobileNumber, onChangeText],
  );

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(e);
      setIsFocused(true);
    },
    [onFocus],
  );

  const handleOnBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(e);
      setIsFocused(false);
    },
    [onBlur],
  );
  return (
    <View style={style.container}>
      <View
        style={style.labelContainer}
        accessible={true}
        accessibilityLabel={accessibilityTextInputLabel}
      >
        {required && label && (
          <Text color="error700" textSize="size_14">
            *
          </Text>
        )}
        {label && (
          <Text
            style={labelStyle}
            color={variant === 'transparent' ? 'alphaWhite' : 'primaryText'}
            textSize="size_14"
          >
            {label}
          </Text>
        )}
        {subLabel && (
          <Text
            style={labelStyle}
            color={variant === 'transparent' ? 'alphaWhite' : 'gray500'}
            textSize="size_14"
          >
            {subLabel}
          </Text>
        )}
      </View>
      <View>
        <View
          style={[
            style.inputContainer,
            inputContainerStyle,
            isFocused && style.focusInputContainer,
            isError && style.errorInputContainer,
          ]}
        >
          {prefix && prefix}
          {startIconName && (
            <Icon
              style={style.startIcon}
              name={startIconName}
              color={
                isError
                  ? 'error700'
                  : variant === 'transparent'
                  ? 'alphaWhite'
                  : 'primaryText'
              }
              size={px(iconSize)}
            />
          )}

          <RNTextInput
            value={value}
            style={StyleSheet.compose(style.input, inputStyle)}
            placeholderTextColor={
              getVariantStyle(theme, textVariant).placeholderTextColor
            }
            cursorColor={
              variant === 'transparent' ? theme.alphaWhite : theme.gray950
            }
            selectionColor={theme.gray950}
            editable={!disabled}
            onChangeText={handleOnChangeText}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            keyboardType={keyboardType}
            secureTextEntry={isSecureText}
            {...rest}
          />
          {suffix && (
            <Text color="gray500" style={style.suffixContainer}>
              {suffix}
            </Text>
          )}
          {endIconName && (
            <Pressable onPress={onEndIconPress}>
              <Icon
                style={style.endIcon}
                name={endIconName}
                color={
                  isError
                    ? 'error700'
                    : variant === 'transparent'
                    ? 'alphaWhite'
                    : 'primaryText'
                }
                size={px(iconSize)}
              />
            </Pressable>
          )}
        </View>
      </View>

      {errorMessage && showError ? (
        <TextMsg
          text={errorMessage}
          iconColor="iconError"
          theme={theme}
          textColor="error700"
        />
      ) : null}

      {showHelperText && helperText && !errorMessage ? (
        <TextMsg text={helperText} theme={theme} />
      ) : null}
    </View>
  );
};
export default TextInput;

const TextMsg = ({
  iconColor,
  text,
  theme,
  textColor,
}: {
  iconColor?: keyof Theme;
  text: string;
  theme: Theme;
  textColor?: keyof Theme;
}) => (
  <View style={styles(theme).textMsgContainer}>
    <Icon name="AlertCircle" color={iconColor ?? 'iconNatural'} size={px(16)} />
    <Text
      color={textColor ?? 'gray700'}
      textSize="size_14"
      textHeight="hight_20"
    >
      {text}
    </Text>
  </View>
);
