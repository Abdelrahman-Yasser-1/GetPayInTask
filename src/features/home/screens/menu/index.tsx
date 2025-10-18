import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { gutters } from '@src/common/constant/styles/gutters';
import { BOTTOM_TAB_HEIGHT } from '@src/common/utils/normalize';
import { MainLayout, NavigationHeader } from '@src/components';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGES, THEME_VARIANT } from '@src/common/enum';
import { useAppTheme } from '@src/theme';
import ListCard, { IListCardProps } from '@src/components/general/ListCard';
import useLogout from '@src/common/hooks/useLogout';
import { currentLanguage, switchLanguage } from '@src/translation';

const Menu = () => {
  const { logout } = useLogout();
  const { t } = useTranslation();
  const { themeName, setTheme } = useAppTheme();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    themeName === THEME_VARIANT.DARK,
  );

  const listCardData: IListCardProps[] = useMemo(
    () => [
      {
        title: t('menuScreen.appearanceSettings'),
        items: [
          {
            iconName: 'Languages',
            title: t('menuScreen.language'),
            disabled: false,
            onPress: () => {
              switchLanguage(
                currentLanguage === APP_LANGUAGES.AR
                  ? APP_LANGUAGES.EN
                  : APP_LANGUAGES.AR,
              );
            },
          },
          {
            iconName: 'Palette',
            title: t('menuScreen.darkMode'),
            disabled: false,
            toggleSize: 'small',
            value: isDarkTheme,
            onSwitch: (value: boolean) => {
              setIsDarkTheme(value);
              value
                ? setTheme(THEME_VARIANT.DARK)
                : setTheme(THEME_VARIANT.LIGHT);
            },
          },
        ],
      },
      {
        title: t('menuScreen.logout'),
        items: [
          {
            iconName: 'LogOut',
            title: t('menuScreen.logout'),
            onPress: logout,
          },
        ],
      },
    ],
    [t, isDarkTheme, logout, setTheme],
  );

  return (
    <MainLayout
      containerVariant="normalView"
      header={
        <NavigationHeader title={t('menuScreen.title')} variant="default" />
      }
    >
      <FlatList
        data={listCardData}
        renderItem={({ item }) => <ListCard {...item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.flatListContainer}
      />
    </MainLayout>
  );
};
export default Menu;

const styles = StyleSheet.create({
  flatListContainer: {
    ...gutters.paddingVertical_24,
  },
  contentContainer: {
    ...gutters.gap_16,
    paddingBottom: BOTTOM_TAB_HEIGHT,
  },
});
