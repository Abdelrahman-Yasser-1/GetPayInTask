import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';
import { gutters, layout, px } from '@src/common';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...gutters.paddingHorizontal_24,
    },
    content: {
      ...layout.fullWidth,
      ...layout.itemsCenter,
      maxWidth: px(400),
    },
    iconContainer: {
      ...gutters.marginBottom_24,
      ...layout.allCenter,
      width: px(80),
      height: px(80),
      borderRadius: Number.MAX_SAFE_INTEGER,
      backgroundColor: theme.SA100,
    },
    title: {
      ...gutters.marginBottom_8,
      textAlign: 'center',
    },
    subtitle: {
      ...gutters.marginBottom_32,
      textAlign: 'center',
      lineHeight: px(24),
    },
    biometricButton: {
      ...gutters.marginBottom_24,
      ...layout.fullWidth,
    },
    divider: {
      ...layout.row,
      ...layout.itemsCenter,
      ...gutters.marginVertical_24,
      ...layout.fullWidth,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.SA200,
    },
    dividerText: {
      ...gutters.paddingHorizontal_16,
    },
    passwordSection: {
      ...layout.fullWidth,
      ...gutters.gap_12,
    },
    unlockButton: {
      ...layout.fullWidth,
    },
  });
