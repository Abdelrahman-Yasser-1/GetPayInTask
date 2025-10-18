import { MMKV_KEYS, THEME_VARIANT } from '@src/common/enum';
import { getData } from '@src/common/utils/MMKStorage';

export type shadowType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export const boxShadow = (type: shadowType) => {
  const shadowColor =
    getData(MMKV_KEYS.THEME) === THEME_VARIANT.LIGHT
      ? 'rgba(16, 24, 40,0.8)'
      : '#4D5761';
  switch (type) {
    case 'xs':
      return {
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2,
      };
    case 'sm':
      return {
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
      };
    case 'md':
      return {
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
      };
    case 'lg':
      return {
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
      };
    case 'xl':
      return {
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.22,
        shadowRadius: 10.24,
        elevation: 13,
      };
    case '2xl':
      return {
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.23,
        shadowRadius: 12.81,
        elevation: 16,
      };
    case '3xl':
      return {
        shadowColor: shadowColor,
        shadowOffset: {
          width: 0,
          height: 32,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15.38,
        elevation: 24,
      };
    default:
      return {};
  }
};

export default boxShadow;
