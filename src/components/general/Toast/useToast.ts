import Toast from 'react-native-toast-message';
import { IToastBaseProps, ToastTypes } from './ToastBase';
import { showToast } from './config';

export type TShowToastParams = Omit<IToastBaseProps, 'type' | 'hideToast'>;

const useToast = () => ({
  showErrorToast: (args: TShowToastParams) => {
    showToast({
      ...args,
      type: ToastTypes.errorToast,
      hideToast: () => Toast.hide(),
    });
  },
  showSuccessToast: (args: TShowToastParams) => {
    showToast({
      ...args,
      type: ToastTypes.successToast,
      hideToast: () => Toast.hide(),
    });
  },
  showInfoToast: (args: TShowToastParams) =>
    showToast({
      type: ToastTypes.infoToast,
      ...args,
      hideToast: () => Toast.hide(),
    }),
  showDefaultToast: (args: TShowToastParams) =>
    showToast({
      type: ToastTypes.defaultToast,
      ...args,
      hideToast: () => Toast.hide(),
    }),
  showWarningToast: (args: TShowToastParams) => {
    showToast({
      type: ToastTypes.warningToast,
      ...args,
      hideToast: () => Toast.hide(),
    });
  },
});

export default useToast;
