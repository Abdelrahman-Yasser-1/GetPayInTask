import { StyleSheet } from 'react-native';
import { gutters, layout, px, boxShadow } from '@src/common';
import { Theme } from '@src/types';

export default (theme: Theme) =>
  StyleSheet.create({
    // Container
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    // Header
    headerContainer: {
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingVertical_12,
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      backgroundColor: theme.background,
    },

    editButton: {
      ...gutters.padding_8,
      borderRadius: px(8),
      backgroundColor: theme.SA100,
    },

    // Loading States
    loadingContainer: {
      flex: 1,
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...gutters.paddingHorizontal_16,
    },

    loadingText: {
      ...gutters.marginTop_16,
      textAlign: 'center',
    },

    // Error States
    errorContainer: {
      flex: 1,
      ...layout.justifyCenter,
      ...layout.itemsCenter,
      ...gutters.paddingHorizontal_16,
    },

    errorTitle: {
      ...gutters.marginTop_16,
    },

    errorMessage: {
      ...gutters.marginTop_8,
    },

    retryButton: {
      ...gutters.marginTop_24,
    },

    // Profile Header
    profileHeader: {
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingVertical_24,
      ...layout.row,
      ...layout.itemsCenter,
      backgroundColor: theme.background,
    },

    avatarContainer: {
      ...gutters.marginRight_16,
    },

    avatar: {
      width: px(80),
      height: px(80),
      borderRadius: Number.MAX_SAFE_INTEGER,
    },

    avatarPlaceholder: {
      width: px(80),
      height: px(80),
      borderRadius: px(40),
      backgroundColor: theme.SA600,
      ...layout.justifyCenter,
      ...layout.itemsCenter,
    },

    userInfo: {
      flex: 1,
    },

    userName: {
      ...gutters.marginBottom_4,
    },

    userRole: {
      ...gutters.marginBottom_4,
      textTransform: 'capitalize',
    },

    userEmail: {
      lineHeight: px(20),
    },

    // Sections
    section: {
      ...gutters.marginBottom_24,
    },

    sectionTitle: {
      ...gutters.paddingHorizontal_16,
      ...gutters.marginBottom_12,
    },

    // Info Cards
    infoCard: {
      ...gutters.marginHorizontal_16,
      backgroundColor: theme.background,
      borderRadius: px(12),
      ...boxShadow('md'),
      ...gutters.padding_16,
    },

    infoRow: {
      ...layout.row,
      ...layout.itemsCenter,
      ...gutters.paddingVertical_12,
      borderBottomWidth: 1,
      borderBottomColor: theme.SA200,
    },

    infoContent: {
      ...gutters.marginLeft_12,
      ...layout.flex_1,
    },

    // Action Section
    actionSection: {
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingBottom_24,
    },
  });
