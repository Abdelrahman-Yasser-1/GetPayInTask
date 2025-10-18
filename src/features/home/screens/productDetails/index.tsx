import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  MainLayout,
  Text,
  Button,
  Icon,
  NavigationHeader,
  NavigationAction,
} from '@src/components';
import { TDashboardParamList } from '@src/navigation/types';
import { StackScreenProps } from '@react-navigation/stack';
import { useProductById } from '../../hooks';
import { IProductByIdRes } from '@src/types/apiResponse';
import { useAppTheme } from '@src/theme';
import styles from './styles';

const ProductDetails = ({
  route,
}: StackScreenProps<TDashboardParamList, 'ProductDetails'>) => {
  const { id } = route.params;
  const { theme } = useAppTheme();
  const { productByIdData, isFetching, isError, error } = useProductById(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    console.log('Add to cart:', productByIdData?.title);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBuyNow = () => {
    console.log('Buy now:', productByIdData?.title);
  };

  if (isFetching) {
    return (
      <MainLayout header={<NavigationHeader title="Product Details" />}>
        <View style={styles(theme).loadingContainer}>
          <ActivityIndicator size="large" color={theme.SA600} />
          <Text
            textSize="size_16"
            fontWight="medium"
            color="gray500"
            style={styles(theme).loadingText}
          >
            Loading product details...
          </Text>
        </View>
      </MainLayout>
    );
  }

  if (isError || !productByIdData) {
    return (
      <MainLayout
        header={
          <NavigationHeader
            title="Product Details"
            startAction={<NavigationAction.Back variant="default" />}
          />
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
            Failed to load product
          </Text>
          <Text textSize="size_14" fontWight="regular" color="gray500">
            {error?.message || 'Something went wrong. Please try again.'}
          </Text>
        </View>
      </MainLayout>
    );
  }

  const product = productByIdData as IProductByIdRes;
  const discountPrice =
    product.price - (product.price * product.discountPercentage) / 100;
  const isLowStock = product.stock < 10;

  return (
    <MainLayout
      header={
        <NavigationHeader
          title="Product Details"
          startAction={<NavigationAction.Back variant="default" />}
          endAction={
            <Pressable
              onPress={handleFavorite}
              style={styles(theme).favoriteButton}
            >
              <Icon
                name={isFavorite ? 'Heart' : 'Heart'}
                size={24}
                color={isFavorite ? 'error500' : 'gray600'}
              />
            </Pressable>
          }
        />
      }
      footer={
        <View style={styles(theme).actionButtons}>
          <Button
            title="Add to Cart"
            variant="secondarySolid"
            size="medium"
            onPress={handleAddToCart}
            style={styles(theme).actionButton}
          />
          <Button
            title="Buy Now"
            variant="primaryBrand"
            size="medium"
            onPress={handleBuyNow}
            style={styles(theme).actionButton}
          />
        </View>
      }
      isHeaderFixed
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles(theme).container}
      >
        {/* Product Images */}
        <View style={styles(theme).imageSection}>
          <Image
            source={{
              uri: product.images[selectedImageIndex] || product.thumbnail,
            }}
            style={styles(theme).mainImage}
            resizeMode="cover"
          />
          {product.images.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles(theme).thumbnailContainer}
              contentContainerStyle={styles(theme).thumbnailContent}
            >
              {product.images.map((image, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedImageIndex(index)}
                  style={[
                    styles(theme).thumbnail,
                    selectedImageIndex === index &&
                      styles(theme).selectedThumbnail,
                  ]}
                >
                  <Image
                    source={{ uri: image }}
                    style={styles(theme).thumbnailImage}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Product Info */}
        <View style={styles(theme).contentSection}>
          {/* Title and Brand */}
          <View style={styles(theme).titleSection}>
            <Text
              textSize="size_24"
              fontWight="bold"
              color="primaryText"
              style={styles(theme).productTitle}
            >
              {product.title}
            </Text>
            <Text textSize="size_16" fontWight="medium" color="secondaryText">
              by {product.brand}
            </Text>
          </View>

          {/* Rating and Reviews */}
          <View style={styles(theme).ratingSection}>
            <View style={styles(theme).ratingContainer}>
              <Icon name="Star" size={16} color="warning500" />
              <Text
                textSize="size_14"
                fontWight="semiBold"
                color="primaryText"
                style={styles(theme).ratingText}
              >
                {product.rating.toFixed(1)}
              </Text>
              <Text
                textSize="size_12"
                fontWight="regular"
                color="gray500"
                style={styles(theme).reviewCount}
              >
                ({product.reviews.length} reviews)
              </Text>
            </View>
            <View style={styles(theme).stockContainer}>
              <Icon
                name={isLowStock ? 'AlertTriangle' : 'CheckCircle'}
                size={16}
                color={isLowStock ? 'warning500' : 'success500'}
              />
              <Text
                textSize="size_12"
                fontWight="medium"
                color={isLowStock ? 'warning500' : 'success500'}
                style={styles(theme).stockText}
              >
                {product.availabilityStatus}
              </Text>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles(theme).priceSection}>
            <View style={styles(theme).priceContainer}>
              <Text
                textSize="size_24"
                fontWight="bold"
                color="primaryText"
                style={styles(theme).currentPrice}
              >
                ${discountPrice.toFixed(2)}
              </Text>
              {product.discountPercentage > 0 && (
                <>
                  <Text
                    textSize="size_18"
                    fontWight="medium"
                    color="gray500"
                    style={styles(theme).originalPrice}
                  >
                    ${product.price.toFixed(2)}
                  </Text>
                  <View style={styles(theme).discountBadge}>
                    <Text
                      textSize="size_12"
                      fontWight="bold"
                      color="alphaWhite"
                    >
                      -{product.discountPercentage.toFixed(0)}%
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Description */}
          <View style={styles(theme).descriptionSection}>
            <Text
              textSize="size_16"
              fontWight="semiBold"
              color="primaryText"
              style={styles(theme).sectionTitle}
            >
              Description
            </Text>
            <Text
              textSize="size_14"
              fontWight="regular"
              color="secondaryText"
              style={styles(theme).description}
            >
              {product.description}
            </Text>
          </View>

          {/* Product Details */}
          <View style={styles(theme).detailsSection}>
            <Text
              textSize="size_16"
              fontWight="semiBold"
              color="primaryText"
              style={styles(theme).sectionTitle}
            >
              Product Details
            </Text>
            <View style={styles(theme).detailsList}>
              <View style={styles(theme).detailRow}>
                <Text textSize="size_14" fontWight="medium" color="gray600">
                  SKU
                </Text>
                <Text
                  textSize="size_14"
                  fontWight="regular"
                  color="primaryText"
                >
                  {product.sku}
                </Text>
              </View>
              <View style={styles(theme).detailRow}>
                <Text textSize="size_14" fontWight="medium" color="gray600">
                  Weight
                </Text>
                <Text
                  textSize="size_14"
                  fontWight="regular"
                  color="primaryText"
                >
                  {product.weight} kg
                </Text>
              </View>
              <View style={styles(theme).detailRow}>
                <Text textSize="size_14" fontWight="medium" color="gray600">
                  Dimensions
                </Text>
                <Text
                  textSize="size_14"
                  fontWight="regular"
                  color="primaryText"
                >
                  {product.dimensions.width} × {product.dimensions.height} ×{' '}
                  {product.dimensions.depth} cm
                </Text>
              </View>
              <View style={styles(theme).detailRow}>
                <Text textSize="size_14" fontWight="medium" color="gray600">
                  Category
                </Text>
                <Text
                  textSize="size_14"
                  fontWight="regular"
                  color="primaryText"
                >
                  {product.category}
                </Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          {product.tags.length > 0 && (
            <View style={styles(theme).tagsSection}>
              <Text
                textSize="size_16"
                fontWight="semiBold"
                color="primaryText"
                style={styles(theme).sectionTitle}
              >
                Tags
              </Text>
              <View style={styles(theme).tagsContainer}>
                {product.tags.map((tag, index) => (
                  <View key={index} style={styles(theme).tag}>
                    <Text textSize="size_12" fontWight="medium" color="SA600">
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Reviews Section */}
          {product.reviews.length > 0 && (
            <View style={styles(theme).reviewsSection}>
              <Text
                textSize="size_16"
                fontWight="semiBold"
                color="primaryText"
                style={styles(theme).sectionTitle}
              >
                Reviews ({product.reviews.length})
              </Text>
              {product.reviews.slice(0, 3).map((review, index) => (
                <View key={index} style={styles(theme).reviewItem}>
                  <View style={styles(theme).reviewHeader}>
                    <Text
                      textSize="size_14"
                      fontWight="semiBold"
                      color="primaryText"
                    >
                      {review.reviewerName}
                    </Text>
                    <View style={styles(theme).reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          color={i < review.rating ? 'warning500' : 'gray300'}
                        />
                      ))}
                    </View>
                  </View>
                  <Text
                    textSize="size_12"
                    fontWight="regular"
                    color="secondaryText"
                    style={styles(theme).reviewComment}
                  >
                    {review.comment}
                  </Text>
                  <Text textSize="size_10" fontWight="regular" color="gray500">
                    {new Date(review.date).toLocaleDateString()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default ProductDetails;
