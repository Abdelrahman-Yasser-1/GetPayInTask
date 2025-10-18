import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { useAppTheme } from '@src/theme';
import { IProduct } from '@src/types/apiResponse';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';

export interface IProductItemProps {
  product: IProduct;
  onPress?: (product: IProduct) => void;
  onAddToCart?: (product: IProduct) => void;
  onFavorite?: (product: IProduct) => void;
  onDelete?: (product: IProduct) => void;
  variant?: 'grid' | 'list';
  showFavorite?: boolean;
  showAddToCart?: boolean;
  showDelete?: boolean;
  style?: any;
}

const ProductItem = ({
  product,
  onPress,
  onAddToCart,
  onFavorite,
  onDelete,
  variant = 'grid',
  showFavorite = true,
  showAddToCart = true,
  showDelete = false,
  style,
}: IProductItemProps) => {
  const { theme } = useAppTheme();

  const handlePress = () => {
    onPress?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleFavorite = () => {
    onFavorite?.(product);
  };

  const handleDelete = () => {
    onDelete?.(product);
  };

  const calculateDiscountedPrice = () => {
    if (product.discountPercentage > 0) {
      return product.price * (1 - product.discountPercentage / 100);
    }
    return product.price;
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon
            key={i}
            name="Star"
            size={12}
            color="gold500"
            style={styles(theme).starIcon}
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Icon
            key={i}
            name="StarHalf"
            size={12}
            color="gold500"
            style={styles(theme).starIcon}
          />,
        );
      } else {
        stars.push(
          <Icon
            key={i}
            name="Star"
            size={12}
            color="gray300"
            style={styles(theme).starIcon}
          />,
        );
      }
    }
    return stars;
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles(theme).container,
        variant === 'list' && styles(theme).listContainer,
        style,
      ]}
    >
      {/* Product Image */}
      <View style={styles(theme).imageContainer}>
        <Image
          source={{
            uri: `https://picsum.photos/300/300?random=${product.id}`,
          }}
          style={styles(theme).productImage}
          resizeMode="cover"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <View style={styles(theme).discountBadge}>
            <Text textSize="size_12" fontWight="bold" color="alphaWhite">
              -{product.discountPercentage}%
            </Text>
          </View>
        )}

        {/* Favorite Button */}
        {showFavorite && (
          <Pressable
            onPress={handleFavorite}
            style={styles(theme).favoriteButton}
          >
            <Icon name="Heart" size={16} color="gray500" />
          </Pressable>
        )}

        {/* Stock Status */}
        {isOutOfStock && (
          <View style={styles(theme).outOfStockOverlay}>
            <Text textSize="size_14" fontWight="bold" color="alphaWhite">
              Out of Stock
            </Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles(theme).contentContainer}>
        {/* Category */}
        <Text
          textSize="size_12"
          fontWight="medium"
          color="gray500"
          style={styles(theme).category}
        >
          {product.category}
        </Text>

        {/* Title */}
        <Text
          textSize="size_16"
          fontWight="semiBold"
          color="primaryText"
          numberOfLines={variant === 'grid' ? 2 : 1}
          style={styles(theme).title}
        >
          {product.title}
        </Text>

        {/* Description */}
        {variant === 'list' && (
          <Text
            textSize="size_14"
            fontWight="regular"
            color="secondaryText"
            numberOfLines={2}
            style={styles(theme).description}
          >
            {product.description}
          </Text>
        )}

        {/* Rating */}
        <View style={styles(theme).ratingContainer}>
          <View style={styles(theme).starsContainer}>
            {renderStars(product.rating)}
          </View>
          <Text
            textSize="size_12"
            fontWight="medium"
            color="gray600"
            style={styles(theme).ratingText}
          >
            ({product.rating.toFixed(1)})
          </Text>
        </View>

        {/* Tags */}
        {product.tags.length > 0 && variant === 'list' && (
          <View style={styles(theme).tagsContainer}>
            {product.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles(theme).tag}>
                <Text textSize="size_10" fontWight="medium" color="SA600">
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Price and Actions */}
        <View style={styles(theme).footerContainer}>
          <View style={styles(theme).priceContainer}>
            <Text
              textSize="size_18"
              fontWight="bold"
              color="primaryText"
              style={styles(theme).currentPrice}
            >
              {formatPrice(calculateDiscountedPrice())}
            </Text>
            {product.discountPercentage > 0 && (
              <Text
                textSize="size_14"
                fontWight="medium"
                color="gray500"
                style={styles(theme).originalPrice}
              >
                {formatPrice(product.price)}
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles(theme).actionButtonsContainer}>
            {/* Add to Cart Button */}
            {showAddToCart && (
              <Pressable
                onPress={handleAddToCart}
                style={[
                  styles(theme).addToCartButton,
                  isOutOfStock && styles(theme).disabledButton,
                ]}
                disabled={isOutOfStock}
              >
                <Icon
                  name="ShoppingCart"
                  size={16}
                  color={isOutOfStock ? 'gray400' : 'alphaWhite'}
                />
              </Pressable>
            )}

            {/* Delete Button for Superadmin */}
            {showDelete && (
              <Pressable
                onPress={handleDelete}
                style={styles(theme).deleteButton}
              >
                <Icon name="Trash2" size={16} color="alphaWhite" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Stock Info */}
        <View style={styles(theme).stockContainer}>
          <Icon
            name="Package"
            size={12}
            color={isOutOfStock ? 'error500' : 'success500'}
          />
          <Text
            textSize="size_12"
            fontWight="medium"
            color={isOutOfStock ? 'error500' : 'success500'}
            style={styles(theme).stockText}
          >
            {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;
