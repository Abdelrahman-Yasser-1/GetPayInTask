import React, { useCallback } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles.style';
import { useAppTheme } from '@src/theme';
import { THEME_VARIANT } from '@src/common/enum';
import { useFocusEffect } from '@react-navigation/native';

export type TContainerVariant =
  | 'roundedTop'
  | 'container'
  | 'stretched'
  | 'normalView'
  | 'none';

export type TContainerColor = 'gray50' | 'default';
interface IMainLayoutProps {
  children: React.ReactNode;
  statusBarColor?: string;
  /** Container paddingHorizontal variant to match figma, @type TContainerVariant:   | 'container'
  | 'stretched' => paddingHorizontal 16
  | 'normalView' => no scrolling
  | 'none'; => no padding
  */
  containerVariant?: TContainerVariant;
  /** Pass custom header to be used at your screen */
  header?: React.ReactNode;
  /** Pass custom footer to be used at your screen */
  footer?: React.ReactNode;
  isTranslucentStatusBar?: boolean;
  barVariant?: StatusBarStyle;
  /** if true the header will be out of scrolling, and out of the container */
  isHeaderFixed?: boolean;
  /** if true the footer will be out of scrolling, and out of the container */
  isFooterFixed?: boolean;
  /** containerColor */
  containerColor?: TContainerColor;
}

const LayoutBody = ({
  containerVariant,
  header,
  isHeaderFixed,
  isFooterFixed,
  containerColor,
  children,
  footer,
}: IMainLayoutProps) => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={styles(theme, containerVariant as TContainerVariant).container}
    >
      {header && !isHeaderFixed ? (
        <View
          style={[
            styles(theme, containerVariant as TContainerVariant, containerColor)
              .headerContainer,
            // Add safe area padding for non-fixed headers
            { paddingTop: insets.top },
          ]}
        >
          {header}
        </View>
      ) : null}
      <View
        style={StyleSheet.flatten([
          styles(theme, containerVariant as TContainerVariant, containerColor)
            .innerContainer,
          // Add safe area padding to content when header is fixed
          isHeaderFixed && { paddingTop: insets.top },
        ])}
      >
        {children}
        {!isFooterFixed && footer ? footer : null}
      </View>
    </View>
  );
};

const MainLayout = ({
  statusBarColor,
  children,
  containerVariant = 'stretched',
  containerColor = 'default',
  header,
  footer,
  isTranslucentStatusBar = false,
  barVariant,
  isHeaderFixed,
  isFooterFixed,
}: IMainLayoutProps) => {
  const { theme, themeName } = useAppTheme();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (barVariant) StatusBar.setBarStyle(barVariant);

      if (statusBarColor) {
        if (Platform.OS === 'android')
          StatusBar.setBackgroundColor(statusBarColor);
        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android' && statusBarColor === 'transparent')
          StatusBar.setTranslucent(true);
      } else {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(theme.statusBar);
          StatusBar.setTranslucent(isTranslucentStatusBar);
        }
        if (themeName === THEME_VARIANT.DARK)
          StatusBar.setBarStyle('light-content');
        else StatusBar.setBarStyle('dark-content');
      }
    }, [
      barVariant,
      statusBarColor,
      themeName,
      theme.statusBar,
      isTranslucentStatusBar,
    ]),
  );

  return (
    <>
      <StatusBar translucent={isTranslucentStatusBar} />
      {containerVariant === 'normalView' ? (
        <>
          {isHeaderFixed && header ? (
            <View style={{ paddingTop: insets.top }}>{header}</View>
          ) : null}
          <LayoutBody
            barVariant={barVariant}
            containerColor={containerColor}
            footer={footer}
            header={header}
            containerVariant={containerVariant}
            isFooterFixed={isFooterFixed}
            isHeaderFixed={isHeaderFixed}
            isTranslucentStatusBar={isTranslucentStatusBar}
            statusBarColor={statusBarColor}
          >
            {children}
          </LayoutBody>
          {isFooterFixed && footer ? footer : null}
        </>
      ) : (
        <>
          {isHeaderFixed && header ? (
            <View style={{ paddingTop: insets.top }}>{header}</View>
          ) : null}
          <ScrollView
            contentContainerStyle={StyleSheet.flatten([{ flexGrow: 1 }])}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <LayoutBody
              barVariant={barVariant}
              containerColor={containerColor}
              footer={footer}
              header={header}
              containerVariant={containerVariant}
              isFooterFixed={isFooterFixed}
              isHeaderFixed={isHeaderFixed}
              isTranslucentStatusBar={isTranslucentStatusBar}
              statusBarColor={statusBarColor}
            >
              {children}
            </LayoutBody>
          </ScrollView>
          {isFooterFixed && footer ? footer : null}
        </>
      )}
    </>
  );
};

export default MainLayout;
