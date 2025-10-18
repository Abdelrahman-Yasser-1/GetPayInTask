import React from 'react';
import {
  MainLayout,
  NavigationAction,
  NavigationHeader,
  Text,
} from '@src/components';
import { StyleSheet, View } from 'react-native';
import { gutters } from '@src/common/constant/styles/gutters';
import { layout } from '@src/common/constant/styles/layout';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <MainLayout
      containerVariant="container"
      header={
        <NavigationHeader
          title={t('signUp.title')}
          startAction={<NavigationAction.Back />}
        />
      }
    >
      <View style={styles.headerSection}>
        <Text
          textSize="size_24"
          fontWight="bold"
          color="primaryText"
          textAlign="center"
        >
          {t('signUp.comingSoon')}
        </Text>
        <Text
          textSize="size_16"
          fontWight="light"
          color="secondaryText"
          textAlign="center"
        >
          {t('signUp.description')}
        </Text>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    ...layout.flex_1,
    ...layout.allCenter,
    ...gutters.gap_12,
  },
});

export default SignUp;
