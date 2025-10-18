import { Dimensions, NativeModules, PixelRatio, Platform } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;

export const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT as number;
const aspectRatio = SCREEN_HIGHT / SCREEN_WIDTH;
export const isTablet = aspectRatio < 1.6; // Assumes 4:3 aspect ratio for tablets

// TODO: update the width and height based on figma
const designScreenWidth = isTablet ? 600 : 375;
const designScreenHight = 748;

export const BOTTOM_TAB_HEIGHT = 84;

// Normalize Fun
const scale = SCREEN_WIDTH / designScreenWidth; // 375 is width of mobile screen in ui and 600 in case of tablet device  ;

export { SCREEN_WIDTH, SCREEN_HIGHT };

export const px = (size: number) => {
  const newSize = size * scale;

  return newSize;
};

const scaleH = (SCREEN_HIGHT - STATUSBAR_HEIGHT) / designScreenHight;

export const pxH = (size: number) => {
  const newSize = size * scaleH;
  return newSize;
};

export const fontSize = (size: number) => {
  const newSize = (size * SCREEN_WIDTH) / designScreenWidth;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// export const fontSize = (size: number) => {
//   const screenWidth = Dimensions.get('window').width;
//   const scaleFactor = PixelRatio.getFontScale();
//   const standardScreenWidth = 375; // A standard screen width for which the font size is designed
//   const scaleFactorWidth = screenWidth / standardScreenWidth;
//   const adjustedSize = size * scaleFactor * scaleFactorWidth;
//   return adjustedSize;
// };
