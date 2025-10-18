import { StyleSheet } from 'react-native';
import { Theme } from '@src/types';
import { boxShadow, px } from '@src/common';
import { gutters } from '@src/common';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.cardBackground,
      borderRadius: px(12),
      shadowColor: theme.shadowColor,
      ...boxShadow('md'),
      overflow: 'hidden',
      ...gutters.marginBottom_16,
    },
    listContainer: {
      flexDirection: 'row',
      padding: px(16),
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: px(200),
      backgroundColor: theme.grayBackground,
    },
    listImageContainer: {
      width: px(120),
      height: px(120),
      marginRight: px(16),
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    discountBadge: {
      position: 'absolute',
      top: px(8),
      left: px(8),
      backgroundColor: theme.error500,
      borderRadius: px(12),
      paddingHorizontal: px(8),
      paddingVertical: px(4),
    },
    favoriteButton: {
      position: 'absolute',
      top: px(8),
      right: px(8),
      width: px(32),
      height: px(32),
      borderRadius: px(16),
      backgroundColor: theme.alphaWhite,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    outOfStockOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      padding: px(16),
      flex: 1,
    },
    listContentContainer: {
      flex: 1,
      padding: 0,
    },
    category: {
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      ...gutters.marginBottom_4,
    },
    title: {
      lineHeight: px(22),
      ...gutters.marginBottom_8,
    },
    description: {
      lineHeight: px(20),
      ...gutters.marginBottom_8,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      ...gutters.marginBottom_8,
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: px(4),
    },
    starIcon: {
      marginRight: px(2),
    },
    ratingText: {
      ...gutters.marginLeft_4,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      ...gutters.marginBottom_12,
    },
    tag: {
      backgroundColor: theme.SA25,
      borderRadius: px(12),
      paddingHorizontal: px(8),
      paddingVertical: px(4),
      marginRight: px(6),
      marginBottom: px(4),
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...gutters.marginBottom_8,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    currentPrice: {
      ...gutters.marginRight_8,
    },
    originalPrice: {
      textDecorationLine: 'line-through',
    },
    actionButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: px(8),
    },
    addToCartButton: {
      width: px(40),
      height: px(40),
      borderRadius: px(20),
      backgroundColor: theme.SA600,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    deleteButton: {
      width: px(40),
      height: px(40),
      borderRadius: px(20),
      backgroundColor: theme.error500,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    disabledButton: {
      backgroundColor: theme.gray300,
    },
    stockContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stockText: {
      ...gutters.marginLeft_4,
    },
  });
