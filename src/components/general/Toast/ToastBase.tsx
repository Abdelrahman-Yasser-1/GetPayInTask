import React from 'react';
import { Pressable, View } from 'react-native';
import { styles, getToastConfig } from './styles.style';
import { gutters, px } from '@src/common';
import { useAppTheme } from '@src/theme';
import Text from '../Text';
import Icon from '../Icon';
import { Theme } from '@src/types';
import Button from '../Button';

export enum ToastTypes {
  errorToast = 'errorToast',
  successToast = 'successToast',
  infoToast = 'infoToast',
  warningToast = 'warningToast',
  defaultToast = 'defaultToast',
}

export interface IToastBaseProps {
  type: ToastTypes;
  isClosable?: boolean;
  message: string;
  description?: string;
  buttons?: {
    title: string;
    onPress: () => void;
  }[];
  hideToast: () => void;
}

const ToastBase = ({
  type,
  isClosable,
  description,
  message,
  buttons,
  hideToast,
}: IToastBaseProps) => {
  const { theme } = useAppTheme();
  const toastStyles = getToastConfig(theme, type);

  return (
    <Pressable onPress={() => hideToast()} style={styles(theme, type).toast}>
      <View style={[gutters.paddingHorizontal_16]}>
        <View style={styles(theme, type).body}>
          <View style={styles(theme, type).bodyStart}>
            {toastStyles?.iconName && (
              <View style={styles(theme, type).iconBackground}>
                <Icon
                  size={px(16)}
                  name={toastStyles?.iconName}
                  color={toastStyles?.iconColor as keyof Theme}
                />
              </View>
            )}
            <View style={styles(theme, type).textWidth}>
              <Text
                textSize="size_16"
                textHeight="hight_24"
                fontWight="semiBold"
                color="defaultText"
              >
                {message}
              </Text>
            </View>
          </View>
          {isClosable ? (
            <Pressable
              onPress={() => hideToast()}
              style={[
                styles(theme, type).iconBackground,
                {
                  backgroundColor: theme.gray100,
                },
              ]}
            >
              <Icon size={px(12)} name="X" color="iconDefault" />
            </Pressable>
          ) : null}
        </View>

        {description ? (
          <View style={styles(theme, type).descriptionContainer}>
            <Text
              textSize="size_14"
              textHeight="hight_20"
              fontWight="regular"
              color="gray500"
              numberOfLines={4}
            >
              {description}
            </Text>
          </View>
        ) : null}
      </View>

      {buttons && buttons?.length > 0 ? (
        <View style={styles(theme, type).buttonsContainer}>
          {buttons.map(btn => (
            <Button
              key={btn.title}
              title={btn.title}
              variant="transparent"
              onPress={btn.onPress}
              size="small"
            />
          ))}
        </View>
      ) : null}
    </Pressable>
  );
};

export default ToastBase;
