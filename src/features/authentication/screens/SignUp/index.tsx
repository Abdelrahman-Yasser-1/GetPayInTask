import React from 'react';
import {
  MainLayout,
  NavigationAction,
  NavigationHeader,
  Text,
} from '@src/components';
import { StyleSheet, View } from 'react-native';
import { gutters, layout } from '@src/common';

const SignUp = () => {
  return (
    <MainLayout
      containerVariant="container"
      header={
        <NavigationHeader
          title="Sign Up"
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
          Sign Up Screen Coming Soon
        </Text>
        <Text
          textSize="size_16"
          fontWight="light"
          color="secondaryText"
          textAlign="center"
        >
          Not included in our task, but you can sign up and login to the app.
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
