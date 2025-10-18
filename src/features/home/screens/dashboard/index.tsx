import React, { useState } from 'react';
import {
  MainLayout,
  Text,
  ProductItem,
  CategoryItem,
  NavigationHeader,
  NavigationAction,
} from '@src/components';
import { View, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProduct, useCategories, useDeleteProduct } from '../../hooks';
import { IProduct, ICategory } from '@src/types/apiResponse';
import { TDashboardParamList } from '@src/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsSuperAdmin } from '@src/store/selectors';
import { useToast } from '@src/components';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@src/common/enum';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const Dashboard = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');
  const [deletedProducts, setDeletedProducts] = useState<number[]>([]);
  const navigation = useNavigation<StackNavigationProp<TDashboardParamList>>();
  const isSuperAdmin = useIsSuperAdmin();
  const { showSuccessToast, showErrorToast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { categoriesData } = useCategories();
  const { productsData, isFetching: isProductsFetching } = useProduct();

  const { deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      showSuccessToast({
        message: t('product.productDeleted'),
        isClosable: true,
      });
    },
    onError: () => {
      showErrorToast({
        message: t('product.deleteFailed'),
        isClosable: true,
      });
    },
  });

  // Always show all products on dashboard since we removed the "All" category
  const productsToShow = (productsData?.products || []) as IProduct[];

  // Filter out deleted products
  const filteredProducts = productsToShow.filter(
    product => !deletedProducts.includes(product.id),
  );

  const handleAddToCart = (product: IProduct) => {
    console.log('Add to cart:', product.title);
  };

  const handleFavorite = (product: IProduct) => {
    console.log('Toggle favorite:', product.title);
  };

  const handleRefresh = () => {
    console.log('Refreshing products...');
    // Force refresh all product queries
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.PRODUCTS_BY_CATEGORY],
    });
  };

  const handleCategoryPress = (category: ICategory) => {
    navigation.navigate('Category', {
      category: category.slug,
      categoryName: category.name,
    });
  };

  const handleProductPress = (product: IProduct) => {
    navigation.navigate('ProductDetails', { id: product.id.toString() });
  };

  const handleDeleteProduct = (product: IProduct) => {
    setDeletedProducts(prev => [...prev, product.id]);
    deleteProduct(product.id.toString());
  };

  return (
    <MainLayout
      containerVariant="normalView"
      header={
        <NavigationHeader
          title={t('dashboard.title')}
          subtitle={t('dashboard.subtitle')}
          endAction={
            <NavigationAction.GridAndListView
              viewType={viewType}
              onPress={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
            />
          }
        />
      }
    >
      <View style={styles().container}>
        {/* Categories FlatList */}
        {categoriesData && categoriesData.length > 0 ? (
          <View style={styles().categoriesSection}>
            <FlatList
              data={categoriesData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.slug}
              renderItem={({ item }) => (
                <CategoryItem
                  category={item}
                  onPress={handleCategoryPress}
                  style={styles().categoryChip}
                />
              )}
              contentContainerStyle={styles().categoriesContainer}
            />
          </View>
        ) : (
          <View style={styles().categoriesSection}>
            <Text textSize="size_14" fontWight="medium" color="gray500">
              {t('dashboard.loadingCategories')}
            </Text>
          </View>
        )}

        {/* Products Grid */}
        <FlatList
          key={`${viewType}-${filteredProducts.length}`}
          data={filteredProducts}
          numColumns={viewType === 'grid' ? 2 : 1}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              onPress={handleProductPress}
              onAddToCart={handleAddToCart}
              onFavorite={handleFavorite}
              onDelete={handleDeleteProduct}
              variant={'grid'}
              showFavorite={true}
              showAddToCart={true}
              showDelete={isSuperAdmin}
              style={styles().productItem}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isProductsFetching}
              onRefresh={handleRefresh}
              colors={['#25935F']}
              tintColor="#25935F"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles().flatListContent}
          {...(viewType === 'grid'
            ? { columnWrapperStyle: styles().row }
            : { rowWrapperStyle: styles().row })}
        />

        {/* Loading State */}
        {isProductsFetching && filteredProducts.length === 0 && (
          <View style={styles().loadingContainer}>
            <Text textSize="size_16" fontWight="medium" color="gray500">
              {t('dashboard.loadingProducts')}
            </Text>
          </View>
        )}

        {/* Empty State */}
        {!isProductsFetching && filteredProducts.length === 0 && (
          <View style={styles().emptyContainer}>
            <Text textSize="size_18" fontWight="medium" color="gray500">
              {t('dashboard.noProducts')}
            </Text>
            <Text textSize="size_14" fontWight="regular" color="gray400">
              {t('dashboard.noProductsDescription')}
            </Text>
          </View>
        )}
      </View>
    </MainLayout>
  );
};

export default Dashboard;
