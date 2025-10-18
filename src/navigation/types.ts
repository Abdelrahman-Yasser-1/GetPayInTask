import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export type TMainStackParamList = {
  Dashboard: undefined;
  AuthStack: NavigatorScreenParams<TAuthStackParamList> | undefined;
  HomeStack: NavigatorScreenParams<THomeBottomTabsParamList> | undefined;
};

export type TMainStackNavigationProp = StackNavigationProp<TMainStackParamList>;
export type TMainStackScreenProps<T extends keyof TMainStackParamList> =
  StackScreenProps<TMainStackParamList, T>;

export type TAuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type TAuthStackNavigationProp = StackNavigationProp<TAuthStackParamList>;

export type TAuthStackScreenProps<T extends keyof TAuthStackParamList> =
  StackScreenProps<TAuthStackParamList, T>;

export type TDashboardParamList = {
  Home: undefined;
  Category: { category: string; categoryName: string };
  ProductDetails: { id: string };
};

export type THomeBottomTabsParamList = {
  Profile: undefined;
  HomeStack: undefined;
  MainMenu: undefined;
};

export type THomeBottomTabsNavigationProp<
  T extends keyof THomeBottomTabsParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<THomeBottomTabsParamList, T>,
  StackScreenProps<TMainStackParamList>
>;

export type THomeBottomTabsScreenProps<
  T extends keyof THomeBottomTabsParamList,
> = BottomTabScreenProps<THomeBottomTabsParamList, T>;
