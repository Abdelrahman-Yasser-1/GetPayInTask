import ReactNativeBiometrics from 'react-native-biometrics';

export interface BiometricResult {
  success: boolean;
  error?: string;
}
class BiometricService {
  private rnBiometrics: ReactNativeBiometrics;

  constructor() {
    this.rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
  }

  async isBiometricAvailable(): Promise<boolean> {
    try {
      const { available, biometryType } =
        await this.rnBiometrics.isSensorAvailable();
      return available && biometryType !== null;
    } catch (error) {
      console.error('Biometric availability check failed:', error);
      return false;
    }
  }

  async authenticateWithBiometrics(): Promise<BiometricResult> {
    try {
      const { success } = await this.rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to unlock the app',
        cancelButtonText: 'Cancel',
        fallbackPromptMessage: 'Use your device passcode to unlock',
      });

      return { success };
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  }

  async authenticateWithPassword(password: string): Promise<BiometricResult> {
    // For this demo, we'll use a simple password check
    // In a real app, you'd want to hash and compare properly
    const correctPassword = '123456'; // This should be stored securely

    if (password === correctPassword) {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Incorrect password',
      };
    }
  }
}

export const biometricService = new BiometricService();
