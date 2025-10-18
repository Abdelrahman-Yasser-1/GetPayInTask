import { boxShadow, gutters, layout, px, SCREEN_WIDTH } from '@src/common';
import { ColorValue, StyleSheet } from 'react-native';
import { Theme } from '@src/types';
import { ToastTypes } from './ToastBase';
import { IconName } from '../Icon';

export const styles = (theme: Theme, toastType: ToastTypes) => {
  const toastStyles = getToastConfig(theme, toastType);

  return StyleSheet.create({
    toast: {
      borderRadius: px(8),
      zIndex: 100,
      width: px(SCREEN_WIDTH - SCREEN_WIDTH * 0.15), // toast Width to be responsible width
      backgroundColor: theme.cardBackground,
      borderStartColor: toastStyles?.borderColor as ColorValue,
      borderStartWidth: px(8),
      ...gutters.paddingVertical_16,
      ...boxShadow('3xl'),
      ...layout.col,
      ...layout.selfCenter,
    },
    body: {
      ...layout.row,
      ...layout.itemsCenter,
      ...layout.justifyBetween,
    },
    iconBackground: {
      borderRadius: 1000,
      backgroundColor: toastStyles?.iconBackground,
      ...gutters.padding_8,
    },
    bodyStart: {
      ...gutters.gap_12,
      ...layout.row,
      ...layout.itemsCenter,
    },
    buttonsContainer: {
      ...gutters.gap_8,
      ...gutters.paddingTop_8,
      ...gutters.paddingStart_64,
      ...layout.row,
    },
    descriptionContainer: {
      ...gutters.paddingStart_48,
      ...gutters.paddingEnd_48,
    },
    textWidth: {
      width: '75%',
    },
  });
};

export const getToastConfig = (theme: Theme, toastType: ToastTypes) =>
  ({
    errorToast: {
      borderColor: theme.error600,
      iconColor: 'iconError',
      iconBackground: theme.error50,
      iconName: 'AlertCircle' as IconName,
    },
    successToast: {
      borderColor: theme.success600,
      iconColor: theme.iconSuccess,
      iconBackground: theme.success50,
      iconName: 'Check' as IconName,
    },
    infoToast: {
      borderColor: theme.info600,
      iconColor: 'iconInfo',
      iconBackground: theme.info50,
      iconName: 'HelpCircle' as IconName,
    },
    warningToast: {
      borderColor: theme,
      iconColor: 'iconWarning',
      iconBackground: theme.warning50,
      iconName: 'AlertTriangle' as IconName,
    },
    defaultToast: {
      borderColor: theme.cardBackground,
      iconColor: 'gray400',
      iconBackground: theme.gray50,
      iconName: 'HelpCircle' as IconName,
    },
  }[toastType as string]);
