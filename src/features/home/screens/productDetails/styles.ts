import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';
import { gutters, layout, px } from '@src/common';
import { boxShadow } from '@src/common';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      ...layout.flex_1,
    },

    loadingContainer: {
      ...layout.flex_1,
      ...layout.allCenter,
      ...gutters.paddingVertical_40,
    },
    loadingText: {
      ...gutters.marginTop_16,
    },
    errorContainer: {
      ...layout.flex_1,
      ...layout.allCenter,
      ...gutters.paddingVertical_40,
      ...gutters.paddingHorizontal_20,
    },
    errorTitle: {
      ...gutters.marginTop_16,
      ...gutters.marginBottom_8,
    },

    favoriteButton: {
      ...gutters.padding_8,
    },

    imageSection: {
      ...gutters.paddingBottom_16,
      borderRadius: px(8),
      ...layout.overflowHidden,
      ...gutters.paddingHorizontal_16,
    },
    mainImage: {
      ...layout.fullWidth,
      height: px(350),
      backgroundColor: theme.gray100,
      borderRadius: px(12),
      ...boxShadow('shadow_1' as any),
    },
    thumbnailContainer: {
      ...gutters.marginTop_16,
    },
    thumbnailContent: {
      ...gutters.paddingRight_16,
      ...layout.row,
      ...layout.itemsCenter,
    },
    thumbnail: {
      width: px(80),
      height: px(80),
      borderRadius: px(8),
      borderWidth: px(1),
      borderColor: theme.SA25,
      ...layout.overflowHidden,
      ...gutters.marginRight_12,
      backgroundColor: theme.gray100,
      ...boxShadow('shadow_1' as any),
    },
    selectedThumbnail: {
      borderColor: theme.SA600,
      borderWidth: px(1),
      ...boxShadow('shadow_2' as any),
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
    },

    contentSection: {
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingBottom_10,
    },

    titleSection: {
      ...gutters.paddingVertical_16,
    },
    productTitle: {
      ...gutters.marginBottom_4,
    },

    ratingSection: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.paddingBottom_16,
    },
    ratingContainer: {
      ...layout.row,
      ...layout.itemsCenter,
    },
    ratingText: {
      ...gutters.marginLeft_4,
      ...gutters.marginRight_8,
    },
    reviewCount: {
      ...gutters.marginLeft_4,
    },
    stockContainer: {
      ...layout.row,
      ...layout.itemsCenter,
    },
    stockText: {
      ...gutters.marginLeft_4,
    },

    priceSection: {
      ...gutters.paddingBottom_20,
    },
    priceContainer: {
      ...layout.row,
      ...layout.itemsCenter,
    },
    currentPrice: {
      ...gutters.marginRight_12,
    },
    originalPrice: {
      textDecorationLine: 'line-through',
      ...gutters.marginRight_8,
    },
    discountBadge: {
      backgroundColor: theme.error500,
      ...gutters.paddingHorizontal_8,
      ...gutters.paddingVertical_4,
      borderRadius: px(4),
    },

    descriptionSection: {
      ...gutters.paddingBottom_20,
    },
    sectionTitle: {
      ...gutters.marginBottom_8,
    },
    description: {
      lineHeight: px(20),
    },

    detailsSection: {
      ...gutters.paddingBottom_20,
    },
    detailsList: {
      backgroundColor: theme.gray50,
      borderRadius: px(8),
      ...gutters.padding_16,
    },
    detailRow: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.paddingVertical_8,
    },

    tagsSection: {
      ...gutters.paddingBottom_20,
    },
    tagsContainer: {
      ...layout.row,
      ...layout.wrap,
      ...gutters.marginTop_8,
    },
    tag: {
      backgroundColor: theme.SA25,
      ...gutters.paddingHorizontal_12,
      ...gutters.paddingVertical_6,
      borderRadius: px(16),
      ...gutters.marginRight_8,
      ...gutters.marginBottom_8,
      borderWidth: px(1),
      borderColor: theme.SA200,
    },

    reviewsSection: {
      ...gutters.paddingBottom_20,
    },
    reviewItem: {
      backgroundColor: theme.cardBackground,
      borderRadius: px(8),
      ...gutters.padding_12,
      ...gutters.marginBottom_8,
      ...boxShadow('sm'),
    },
    reviewHeader: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.marginBottom_4,
    },
    reviewRating: {
      ...layout.row,
    },
    reviewComment: {
      ...gutters.marginBottom_4,
    },

    actionButtons: {
      ...layout.row,
      ...gutters.gap_16,
      ...layout.fullWidth,
      ...gutters.padding_16,
    },
    actionButton: {
      ...layout.flex_1,
      ...layout.fullWidth,
    },
  });
