import Toast, {
  ToastConfig,
  ToastConfigParams,
  ToastPosition,
} from 'react-native-toast-message';
import { IToastBaseProps, ToastTypes } from './ToastBase';
import ToastBase from './ToastBase';
import React from 'react';

interface IShowToastProps extends IToastBaseProps {
  position?: ToastPosition;
}

export const showToast = (props: IShowToastProps) =>
  Toast.show({
    type: props.type,
    position: props.position ?? 'bottom',
    props: {
      ...props,
    },
  });
type TToastParam = ToastConfigParams<IToastBaseProps>;

export const toastConfig: ToastConfig = {
  successToast: ({ props }: TToastParam) => (
    <ToastBase
      type={ToastTypes.successToast}
      message={props.message ?? ''}
      description={props.description}
      hideToast={() => Toast.hide()}
      isClosable={props.isClosable}
      buttons={props.buttons}
    />
  ),
  errorToast: ({ props }: TToastParam) => (
    <ToastBase
      type={ToastTypes.errorToast}
      message={props.message ?? ''}
      description={props.description}
      hideToast={() => Toast.hide()}
      isClosable={props.isClosable}
      buttons={props.buttons}
    />
  ),
  infoToast: ({ props }: TToastParam) => (
    <ToastBase
      type={ToastTypes.infoToast}
      message={props.message ?? ''}
      description={props.description}
      hideToast={() => Toast.hide()}
      isClosable={props.isClosable}
      buttons={props.buttons}
    />
  ),
  warningToast: ({ props }: TToastParam) => (
    <ToastBase
      type={ToastTypes.warningToast}
      message={props.message ?? ''}
      description={props.description}
      hideToast={() => Toast.hide()}
      isClosable={props.isClosable}
      buttons={props.buttons}
    />
  ),
  defaultToast: ({ props }: TToastParam) => (
    <ToastBase
      type={ToastTypes.defaultToast}
      message={props.message ?? ''}
      description={props.description}
      hideToast={() => Toast.hide()}
      isClosable={props.isClosable}
      buttons={props.buttons}
    />
  ),
};
