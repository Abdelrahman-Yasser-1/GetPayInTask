import type { ViewProps, ViewStyle } from 'react-native';
import { ILoadingProps } from './appLoader';

type ResizeModeType = 'cover' | 'contain' | 'stretch' | 'center';

type PriorityType = 'low' | 'normal' | 'high';

type CacheType = 'immutable' | 'web' | 'cacheOnly';

type IStyleWithoutPadding = Omit<
  ViewStyle,
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingVertical'
  | 'paddingHorizontal'
>;
export interface ISmartImageProps extends Omit<ViewProps, 'style'> {
  style?: IStyleWithoutPadding | IStyleWithoutPadding[];
  size?: number;
  source?: string;
  placeholder?: number;
  resizeMode?: ResizeModeType;
  priority?: PriorityType;
  cache?: CacheType;
  loadingProps?: ILoadingProps;
  hideLoading?: boolean;
  placeholderBackgroundColor?: string;
}

export interface IPlaceholderProps {
  placeholder?: number;
  resizeMode?: ResizeModeType;
  placeholderBackgroundColor?: string;
}

export interface IImageProps extends IPlaceholderProps {
  source?: string;
  isLoading: boolean;
  isError: boolean;
  priority?: PriorityType;
  cache?: CacheType;
  loadingProps?: ILoadingProps;
  hideLoading?: boolean;
  setLoadingState: (isLoading: boolean) => void;
  setErrorState: (isError: boolean) => void;
}
