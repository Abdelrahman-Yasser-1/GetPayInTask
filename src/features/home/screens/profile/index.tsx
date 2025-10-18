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
  const { getUserInfo, isLoading, isError, data: userData } = useGetUserInfo();

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };

  if (isLoading) {
    return (
      <MainLayout
        header={
          <View style={styles(theme).headerContainer}>
            <Text textSize="size_20" fontWight="bold" color="primaryText">
              Profile
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
            Loading profile...
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
              Profile
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
            Failed to load profile
          </Text>
          <Text
            textSize="size_14"
            fontWight="regular"
            color="gray500"
            style={styles(theme).errorMessage}
          >
            {'Something went wrong. Please try again.'}
          </Text>
          <Button
            title="Retry"
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
            Personal Information
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="User" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  Full Name
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
                  Birth Date
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
                  Gender
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
                  Phone
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
            Physical Information
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="Ruler" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  Height
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
                  Weight
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
                  Eye Color
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
                  Blood Group
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
            Address
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="MapPin" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  Address
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
                  City
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
                  Country
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
                  Postal Code
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
            Work Information
          </Text>
          <View style={styles(theme).infoCard}>
            <View style={styles(theme).infoRow}>
              <Icon name="Building" size={20} color="SA600" />
              <View style={styles(theme).infoContent}>
                <Text textSize="size_12" fontWight="medium" color="gray500">
                  Company
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
                  Department
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
                  University
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
            title="Logout"
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
