import React, { useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import { useLocked } from '@src/store/selectors';
import { useAppDispatch } from '@src/common/hooks/useApp';
import { setLocked } from '@src/store/slices';
import { useBiometricAuth } from '../hooks/useBiometricAuth';
import { Button, MainLayout, Text, TextInput, Icon } from '@src/components';
import { useAppTheme } from '@src/theme';
import styles from './styles';

const LockScreen = () => {
  const { theme } = useAppTheme();
  const dispatch = useAppDispatch();
  const isLocked = useLocked();
  const [password, setPassword] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const {
    isAuthenticating,
    isBiometricAvailable,
    checkBiometricAvailability,
    authenticateWithBiometrics,
    authenticateWithPassword,
  } = useBiometricAuth();

  useEffect(() => {
    checkBiometricAvailability();
  }, [checkBiometricAvailability]);

  // Reset unlocking state when lock state changes
  useEffect(() => {
    if (!isLocked) {
      setIsUnlocking(false);
    }
  }, [isLocked]);

  const handleBiometricAuth = async () => {
    if (isUnlocking) return; // Prevent multiple unlock attempts

    console.log('🔐 Starting biometric authentication...');
    const success = await authenticateWithBiometrics();
    console.log('🔐 Biometric authentication result:', success);
    if (success) {
      console.log('🔐 Biometric authentication successful, unlocking app...');
      setIsUnlocking(true);
      // Add a small delay to ensure the biometric prompt is fully dismissed
      setTimeout(() => {
        dispatch(setLocked(false)); // Unlock the app
        setIsUnlocking(false);
      }, 100);
    } else {
      console.log('🔐 Biometric authentication failed');
    }
  };

  const handlePasswordAuth = async () => {
    if (isUnlocking) return; // Prevent multiple unlock attempts

    const success = await authenticateWithPassword(password);
    if (success) {
      setIsUnlocking(true);
      dispatch(setLocked(false)); // Unlock the app
      setPassword('');
      setIsUnlocking(false);
    }
  };

  // Debug: Log lock state changes
  useEffect(() => {
    console.log('🔒 Lock state changed:', { isLocked, isUnlocking });
  }, [isLocked, isUnlocking]);

  if (!isLocked) {
    return null;
  }

  return (
    <Modal
      visible={isLocked}
      animationType="slide"
      transparent={false}
      statusBarTranslucent
      presentationStyle="fullScreen"
    >
      <MainLayout containerVariant="none">
        <View style={styles(theme).container}>
          <View style={styles(theme).content}>
            <View style={styles(theme).iconContainer}>
              <Icon name="Lock" size={48} color="SA600" />
            </View>

            <Text
              textSize="size_24"
              fontWight="bold"
              color="primaryText"
              style={styles(theme).title}
            >
              App Locked
            </Text>

            <Text
              textSize="size_16"
              fontWight="regular"
              color="secondaryText"
              style={styles(theme).subtitle}
            >
              Authenticate to unlock the app
            </Text>

            {isBiometricAvailable && (
              <Button
                onPress={handleBiometricAuth}
                isDisable={isAuthenticating || isUnlocking}
                title={isUnlocking ? 'Unlocking...' : 'Use Biometrics'}
                variant="primaryBrand"
                size="large"
                style={styles(theme).biometricButton}
              />
            )}

            <View style={styles(theme).divider}>
              <View style={styles(theme).dividerLine} />
              <Text
                textSize="size_14"
                fontWight="medium"
                color="gray500"
                style={styles(theme).dividerText}
              >
                OR
              </Text>
              <View style={styles(theme).dividerLine} />
            </View>

            <View style={styles(theme).passwordSection}>
              <Text textSize="size_16" fontWight="medium" color="primaryText">
                Enter Password
              </Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={handlePasswordAuth}
              />

              <Button
                title={isUnlocking ? 'Unlocking...' : 'Unlock'}
                onPress={handlePasswordAuth}
                isLoading={isAuthenticating || isUnlocking}
                variant="secondarySolid"
                size="large"
                style={styles(theme).unlockButton}
              />
            </View>
          </View>
        </View>
      </MainLayout>
    </Modal>
  );
};

export default LockScreen;
