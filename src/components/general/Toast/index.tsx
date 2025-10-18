import React from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './config';

const AppToast = () => (
  <Toast config={toastConfig} bottomOffset={40} visibilityTime={5000} />
);

export default AppToast;
