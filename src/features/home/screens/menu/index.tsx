import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { gutters, BOTTOM_TAB_HEIGHT } from '@src/common';
import { MainLayout, NavigationHeader } from '@src/components';
import { useTranslation } from 'react-i18next';
import { THEME_VARIANT } from '@src/common/enum';
import { useAppTheme } from '@src/theme';
import ListCard, { IListCardProps } from '@src/components/general/ListCard';
import useLogout from '@src/common/hooks/useLogout';

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
            onPress: () => console.log('Language pressed'),
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
          {
            iconName: 'Accessibility',
            title: t('menuScreen.accessibility'),
            onPress: () => console.log('Accessibility pressed'),
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
      header={<NavigationHeader title="Menu" variant="default" />}
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
