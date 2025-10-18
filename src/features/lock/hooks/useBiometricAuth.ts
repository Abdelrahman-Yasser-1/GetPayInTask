import { useState, useCallback } from 'react';
import { biometricService } from '../utils';
import { useToast } from '@src/components';

export const useBiometricAuth = () => {
  const { showErrorToast } = useToast();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  const checkBiometricAvailability = useCallback(async () => {
    try {
      const available = await biometricService.isBiometricAvailable();
      setIsBiometricAvailable(available);
      return available;
    } catch (error) {
      console.error('Failed to check biometric availability:', error);
      setIsBiometricAvailable(false);
      return false;
    }
  }, []);

  const authenticateWithBiometrics = useCallback(async (): Promise<boolean> => {
    if (!isBiometricAvailable) {
      showErrorToast({
        message: 'Biometric authentication is not available on this device.',
        description: 'Please try again',
      });
      return false;
    }

    setIsAuthenticating(true);
    try {
      const result = await biometricService.authenticateWithBiometrics();
      if (result.success) {
        return true;
      } else {
        showErrorToast({
          message: result.error || 'Biometric authentication failed',
          description: 'Please try again',
        });
        return false;
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      showErrorToast({
        message: 'Biometric authentication error',
        description: 'Please try again',
      });
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [isBiometricAvailable, showErrorToast]);

  const authenticateWithPassword = useCallback(
    async (password: string): Promise<boolean> => {
      if (!password.trim()) {
        showErrorToast({
          message: 'Please enter a password',
          description: 'Please enter a password',
        });
        return false;
      }

      setIsAuthenticating(true);
      try {
        const result = await biometricService.authenticateWithPassword(
          password,
        );
        if (result.success) {
          return true;
        } else {
          showErrorToast({
            message: result.error || 'Incorrect password',
            description: 'Please enter the correct password',
          });
          return false;
        }
      } catch (error) {
        console.error('Password authentication error:', error);
        showErrorToast({
          message: 'Password authentication error',
          description: 'Please try again',
        });
        return false;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [showErrorToast],
  );

  return {
    isAuthenticating,
    isBiometricAvailable,
    checkBiometricAvailability,
    authenticateWithBiometrics,
    authenticateWithPassword,
  };
};
