import { config, getData, storeData } from '@src/common';
import { MMKV_KEYS, THEME_VARIANT } from '@src/common/enum';
import React, { useMemo } from 'react';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { Theme, ThemeVariant } from '@src/types';

type ThemeContextType = {
  theme: Theme;
  themeName: ThemeVariant;
  setTheme: (name: ThemeVariant) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: config.theme[THEME_VARIANT.LIGHT].colors,
  themeName: THEME_VARIANT.LIGHT,
  setTheme: () => {},
});

type Props = PropsWithChildren;

function ThemeProvider({ children = false }: Props) {
  const currentTheme =
    getData(MMKV_KEYS.THEME) ?? (THEME_VARIANT.LIGHT as ThemeVariant);
  const themeColors = config.theme;

  const [variant, setVariant] = useState(
    (currentTheme as ThemeVariant) ?? 'light',
  );

  // Initialize theme at default if not defined
  useEffect(() => {
    if (!currentTheme) {
      storeData(MMKV_KEYS.THEME, THEME_VARIANT.LIGHT);
      setVariant(THEME_VARIANT.LIGHT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * This function is used to update the theme in the app
   * @param name is the name of the theme and is of @type ThemeVariant
   */
  const setTheme = (name: ThemeVariant) => {
    storeData(MMKV_KEYS.THEME, name);

    setVariant(name);
  };

  const value = useMemo(
    () => ({
      theme: { ...themeColors[currentTheme as ThemeVariant].colors },
      themeName: variant,
      setTheme,
    }),
    [themeColors, currentTheme, variant],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
