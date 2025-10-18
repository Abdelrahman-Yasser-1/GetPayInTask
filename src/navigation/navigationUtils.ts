import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';
import { TMainStackParamList } from './types';

type RouteName = keyof TMainStackParamList;

export const navigationRef =
  createNavigationContainerRef<TMainStackParamList>();

export const navigate = (
  screenName: RouteName,
  params?: TMainStackParamList[RouteName],
) => {
  if (navigationRef.isReady())
    navigationRef.navigate(screenName, params as undefined);
};

export const getCurrentRouteName = () => {
  if (navigationRef.isReady()) return navigationRef.getCurrentRoute()?.name;

  return undefined;
};

export const goBack = () => {
  if (navigationRef.isReady()) navigationRef.goBack();
};

export const push = (
  screenName: RouteName,
  params?: TMainStackParamList[RouteName],
) => {
  if (navigationRef.isReady())
    navigationRef.dispatch(StackActions.push(screenName, params));
};

export const replace = (
  screenName: RouteName,
  params?: TMainStackParamList[RouteName],
) => {
  if (navigationRef.isReady())
    navigationRef.dispatch(StackActions.replace(screenName, params));
};

export const popToTop = () => {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.popToTop());
};

export const reset = (
  screenName: RouteName,
  params?: TMainStackParamList[RouteName],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName, params: params }],
      }),
    );
  }
};
