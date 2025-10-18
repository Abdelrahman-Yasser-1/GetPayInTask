import React, { useEffect } from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useAppTheme } from '@src/theme';
import {
  MainLayout,
  Text,
  Icon,
  Button,
  NavigationAction,
  NavigationHeader,
} from '@src/components';
import useGetUserInfo from '@src/features/authentication/hooks/useGetUserInfo';
import { IGetUserInfoRes } from '@src/types/apiResponse';
import styles from './styles';
import useLogout from '@src/common/hooks/useLogout';
import { useTranslation } from 'react-i18next';

const getUserInitials = (firstName: string, lastName: string) => {
  const firstLetter = firstName?.[0] || '';
  const secondLetter = lastName?.[0] || '';
  return (firstLetter + secondLetter).toUpperCase();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Profile = () => {
  const { logout } = useLogout();
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const { getUserInfo, isLoading, isError, data: userData } = useGetUserInfo();

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
  };

  if (isLoading) {
    return (
      <MainLayout
        header={
          <View style={styles(theme).headerContainer}>
            <Text textSize="size_20" fontWight="bold" color="primaryText">
              {t('profile.title')}
            </Text>
          </View>
        }
      >
        <View style={styles(theme).loadingContainer}>
          <ActivityIndicator size="large" color="SA600" />
          <Text
            textSize="size_16"
            fontWight="medium"
            color="gray500"
            style={styles(theme).loadingText}
          >
            {t('profile.loadingProfile')}
          </Text>
        </View>
      </MainLayout>
    );
  }

  if (isError || !userData) {
    return (
      <MainLayout
        header={
          <View style={styles(theme).headerContainer}>
            <Text textSize="size_20" fontWight="bold" color="primaryText">
              {t('profile.title')}
            </Text>
          </View>
        }
      >
        <View style={styles(theme).errorContainer}>
          <Icon name="AlertCircle" size={48} color="error500" />
          <Text
            textSize="size_18"
            fontWight="semiBold"
            color="error500"
            style={styles(theme).errorTitle}
          >
            {t('profile.errorLoadingProfile')}
          </Text>
          <Text
            textSize="size_14"
            fontWight="regular"
            color="gray500"
            style={styles(theme).errorMessage}
          >
            {t('common.error')}
          </Text>
          <Button
            title={t('profile.retry')}
            variant="primaryBrand"
            size="medium"
            onPress={() => getUserInfo()}
            style={styles(theme).retryButton}
          />
        </View>
      </MainLayout>
    );
  }

  const user = userData as IGetUserInfoRes;
  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = getUserInitials(user.firstName, user.lastName);

  return (
    <MainLayout
      header={
        <NavigationHeader
          title="Profile"
          startAction={<NavigationAction.Back variant="default" />}
          endAction={
            <NavigationAction.Edit
              variant="default"
              onPress={handleEditProfile}
            />
          }
        />
      }
      isHeaderFixed
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles(theme).container}
      >
        {/* Profile Header */}
        <View style={styles(theme).profileHeader}>
          <View style={styles(theme).avatarContainer}>
            {user.image ? (
              <Image
                source={{ uri: user.image }}
                style={styles(theme).avatar}
              />
            ) : (
              <View style={styles(theme).avatarPlaceholder}>
                <Text textSize="size_24" fontWight="bold" color="alphaWhite">
                  {initials}
                </Text>
              </View>
            )}
          </View>
          <View style={styles(theme).userInfo}>
            <Text
              textSize="size_24"
              fontWight="bold"
              color="primaryText"
              style={styles(theme).userName}
            >
              {fullName}
            </Text>
            <Text
              textSize="size_16"
              fontWight="medium"
              color="secondaryText"
              style={styles(theme).userRole}
            >
              {user.role}
            </Text>
            <Text
              textSize="size_14"
              fontWight="regular"
              color="gray500"
              style={styles(theme).userEmail}
            >
              {user.email}
            </Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles(theme).section}>
          <Text
            textSize="size_18"
            fontWight="semiBold"
            color="primaryText"
            style={styles(theme).sectionTitle}
          >
            {t('profile.personalInfo')}
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="User" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.firstName')} {t('profile.lastName')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {fullName}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Calendar" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.birthDate')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {formatDate(user.birthDate)}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="User" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.gender')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.gender}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Phone" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.phone')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Physical Information */}
        <View style={styles(theme).section}>
          <Text
            textSize="size_18"
            fontWight="semiBold"
            color="primaryText"
            style={styles(theme).sectionTitle}
          >
            {t('profile.personalInfo')}
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="Ruler" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.height')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.height} cm
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Weight" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.weight')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.weight} kg
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Eye" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.eyeColor')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.eyeColor}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Heart" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.bloodGroup')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.bloodGroup}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Address Information */}
        <View style={styles(theme).section}>
          <Text
            textSize="size_18"
            fontWight="semiBold"
            color="primaryText"
            style={styles(theme).sectionTitle}
          >
            {t('profile.address')}
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="MapPin" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.address')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.address.address}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Building" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.city')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.address.city}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Flag" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.country')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.address.country}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Hash" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.postalCode')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.address.postalCode}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Company Information */}
        <View style={styles(theme).section}>
          <Text
            textSize="size_18"
            fontWight="semiBold"
            color="primaryText"
            style={styles(theme).sectionTitle}
          >
            {t('profile.companyInfo')}
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="Building" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.companyName')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.company.name}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Briefcase" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  Title
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.company.title}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="Users" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.department')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.company.department}
                </Text>
              </View>
            </View>
            <View style={styles(theme).infoRow}>
              <Icon name="GraduationCap" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  {t('profile.university')}
                </Text>
                <Text
                  textSize="size_16"
                  fontWight="regular"
                  color="primaryText"
                >
                  {user.university}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles(theme).actionSection}>
          <Button
            title={t('auth.logout')}
            variant="secondarySolid"
            size="large"
            onPress={logout}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default Profile;
