import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Theme } from '@src/types';
import { Menu } from '@src/features';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@src/theme';
import { StyleSheet, View } from 'react-native';
import { gutters, isTablet, px, layout } from '@src/common';
import DashboardStack from './dashboardStack';
import { Icon } from '@src/components';
import { Text } from '@src/components';
import { THomeBottomTabsParamList } from './types';
import { IconName } from '@src/components/general/Icon';
import Profile from '@src/features/home/screens/profile';
const Tab = createBottomTabNavigator<THomeBottomTabsParamList>();

const TabBarIcon = ({
  name,
  size = px(24),
  focused,
}: {
  name: IconName;
  size?: number;
  color: keyof Theme;
  focused: boolean;
}) => {
  const { theme } = useAppTheme();
  return (
    <View style={styles(theme).iconStyle}>
      <Icon
        name={name}
        size={size}
        color={focused ? 'tabBarActiveTintColor' : 'tabBarInactiveTintColor'}
      />
    </View>
  );
};

const HomeBottomTabs = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const tabLabel: Record<keyof THomeBottomTabsParamList, string> = {
    HomeStack: t('screenName.home'),
    MainMenu: t('screenName.menu'),
    Profile: t('screenName.profile'),
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles(theme).tabBarStyle,
        tabBarLabel: ({ focused }) => (
          <Text
            color={
              focused ? 'tabBarActiveTintColor' : 'tabBarInactiveTintColor'
            }
            textSize="size_12"
            fontWight="medium"
            numberOfLines={1}
            style={styles(theme).tabBarLabelStyle}
          >
            {tabLabel[route.name]}
          </Text>
        ),
        tabBarItemStyle: {
          ...gutters.paddingBottom_12,
          ...layout.col,
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="House"
              size={px(24)}
              color="tabBarActiveTintColor"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MainMenu"
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="Menu"
              size={px(24)}
              color="tabBarActiveTintColor"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="User"
              size={px(24)}
              color="tabBarActiveTintColor"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabs;

const styles = (theme: Theme) =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: theme.tabBarBackground,
      height: isTablet ? px(50) : px(84),
      ...gutters.paddingHorizontal_4,
      ...gutters.paddingBottom_8,
    },
    tabBarLabelStyle: {
      ...gutters.paddingHorizontal_8,
    },
    iconStyle: {
      width: px(30),
      ...layout.fullHeight,
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...gutters.marginTop_2,
    },
  });
