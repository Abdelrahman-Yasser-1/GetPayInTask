import { gutters, px } from '@src/common';
import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';

export default (theme: Theme) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      minHeight: '100%',
    },
    container: {
      flex: 1,
      ...gutters.paddingHorizontal_24,
      ...gutters.paddingVertical_32,
    },
    headerSection: {
      alignItems: 'center',
      ...gutters.marginBottom_48,
    },
    logoContainer: {
      width: px(80),
      height: px(80),
      borderRadius: px(40),
      backgroundColor: theme.SA25,
      justifyContent: 'center',
      alignItems: 'center',
      ...gutters.marginBottom_24,
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    welcomeTitle: {
      textAlign: 'center',
      ...gutters.marginBottom_8,
    },
    welcomeSubtitle: {
      textAlign: 'center',
      lineHeight: px(24),
    },
    formSection: {
      ...gutters.marginBottom_32,
    },
    inputContainer: {
      ...gutters.marginBottom_16,
    },
    forgotPasswordContainer: {
      alignSelf: 'flex-end',
      ...gutters.marginTop_8,
      ...gutters.marginBottom_16,
    },
    buttonSection: {
      ...gutters.marginBottom_32,
    },
    footerSection: {
      alignItems: 'center',
    },
    footerText: {
      textAlign: 'center',
      lineHeight: px(20),
    },
    signUpLink: {
      textDecorationLine: 'underline',
    },
    // Legacy styles for backward compatibility
    authContainer: {
      ...gutters.paddingHorizontal_24,
    },
    labelStyle: {
      color: theme.alphaWhite,
    },
    buttonStyle: {
      ...gutters.marginVertical_16,
    },
    underline: {
      textDecorationLine: 'underline',
    },
    nafathLogo: {
      width: px(34),
      height: px(14),
    },
  });
