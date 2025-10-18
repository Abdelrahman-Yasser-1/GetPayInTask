import { useAppTheme } from '@src/theme';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
} from 'react-native';
import styles from './styles';
import {
  Button,
  MainLayout,
  Text,
  TextInput,
  useToast,
  Icon,
} from '@src/components';
import useLogin from '../../hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import { TMainStackNavigationProp } from '@src/navigation/types';
import { useDispatch } from 'react-redux';
import { setTokens, setIsSuperAdmin } from '@src/store/slices';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigation = useNavigation<TMainStackNavigationProp>();
  const { theme } = useAppTheme();
  const { showInfoToast, showSuccessToast } = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [username, setUsername] = useState('oliviaw');
  const [password, setPassword] = useState('oliviawpass');
  const [showPassword, setShowPassword] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login, isLoading, isError, isSuccess, data } = useLogin({
    username: username,
    password: password,
  });

  const handleUsernameChange = useCallback(
    (text: string) => {
      setUsername(text);
      if (usernameError) {
        setUsernameError('');
      }
    },
    [usernameError],
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      setPassword(text);
      if (passwordError) {
        setPasswordError('');
      }
    },
    [passwordError],
  );

  const validateForm = useCallback(() => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError(
        t('validation.fieldRequired', { field: t('auth.username') }),
      );
      isValid = false;
    } else if (username.trim().length < 3) {
      setUsernameError(t('validation.usernameTooShort'));
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(
        t('validation.fieldRequired', { field: t('auth.password') }),
      );
      isValid = false;
    } else if (password.trim().length < 6) {
      setPasswordError(t('validation.passwordTooShort'));
      isValid = false;
    }

    return isValid;
  }, [password, t, username]);

  const handleLogin = useCallback(() => {
    if (validateForm()) {
      console.log('username', username);
      console.log('password', password);
      login();
    }
  }, [login, password, username, validateForm]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  // Animation effect on component mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleSignUp = useCallback(() => {
    navigation.navigate('AuthStack', { screen: 'SignUp' });
  }, [navigation]);

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast({
        message: t('auth.loginSuccess'),
        isClosable: true,
        description: t('auth.welcomeMessage'),
      });
      navigation.replace('HomeStack');
      // store accessToken and refresh token in redux
      dispatch(
        setTokens({
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        }),
      );
      // Check if user is superadmin
      const isSuperAdmin =
        username.toLowerCase() === 'superadmin' ||
        username.toLowerCase() === 'oliviaw';
      dispatch(setIsSuperAdmin(isSuperAdmin));
    }
    if (isError) {
      showInfoToast({
        message: t('auth.loginFailed'),
        isClosable: true,
        description: t('auth.checkCredentials'),
      });
    }
  }, [
    data?.accessToken,
    data?.refreshToken,
    dispatch,
    isError,
    isSuccess,
    navigation,
    showInfoToast,
    showSuccessToast,
    t,
    username,
  ]);

  // const accessToken = useAccessToken();
  // useEffect(() => {
  //   if (accessToken) {
  //     navigation.replace('HomeStack');
  //   }
  // }, [accessToken, navigation]);

  return (
    <MainLayout containerVariant="container">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles(theme).keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles(theme).scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles(theme).container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header Section */}
            <View style={styles(theme).headerSection}>
              <View style={styles(theme).logoContainer}>
                <Icon name="Shield" size={48} color="SA600" />
              </View>
              <Text
                textSize="size_30"
                fontWight="bold"
                color="primaryText"
                style={styles(theme).welcomeTitle}
              >
                {t('auth.welcomeBack')}
              </Text>
              <Text
                textSize="size_16"
                fontWight="regular"
                color="secondaryText"
                style={styles(theme).welcomeSubtitle}
              >
                {t('auth.signInToContinue')}
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles(theme).formSection}>
              <TextInput
                label={t('auth.username')}
                placeholder={t('auth.enterUsername')}
                onChangeText={handleUsernameChange}
                value={username}
                startIconName="User"
                required
                errorMessage={usernameError}
                showError={!!usernameError}
                accessibilityTextInputLabel="Username input field"
                inputContainerStyle={styles(theme).inputContainer}
              />

              <TextInput
                label={t('auth.password')}
                placeholder={t('auth.enterPassword')}
                onChangeText={handlePasswordChange}
                value={password}
                startIconName="Lock"
                endIconName={showPassword ? 'EyeOff' : 'Eye'}
                onEndIconPress={togglePasswordVisibility}
                isSecureText={!showPassword}
                required
                errorMessage={passwordError}
                showError={!!passwordError}
                accessibilityTextInputLabel="Password input field"
                inputContainerStyle={styles(theme).inputContainer}
              />

              {/* Forgot Password Link */}
              <TouchableOpacity style={styles(theme).forgotPasswordContainer}>
                <Text textSize="size_14" fontWight="medium" color="SA600">
                  {t('auth.forgotPassword')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Button Section */}
            <View style={styles(theme).buttonSection}>
              <Button
                title={t('auth.loginButton')}
                onPress={handleLogin}
                isLoading={isLoading}
                isDisable={
                  isLoading ||
                  !username.trim() ||
                  !password.trim() ||
                  !!usernameError ||
                  !!passwordError
                }
                variant="primaryBrand"
                size="large"
              />
            </View>

            {/* Footer Section */}
            <View style={styles(theme).footerSection}>
              <Text
                textSize="size_14"
                fontWight="regular"
                color="tertiaryText"
                style={styles(theme).footerText}
              >
                Don't have an account?{' '}
                <TouchableOpacity onPress={handleSignUp}>
                  <Text
                    textSize="size_14"
                    fontWight="medium"
                    color="SA600"
                    style={styles(theme).signUpLink}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

export default Login;
