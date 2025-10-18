import React, { useState } from 'react';
import {
  MainLayout,
  Text,
  ProductItem,
  NavigationHeader,
  NavigationAction,
} from '@src/components';
import { View, FlatList, RefreshControl } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProductsByCategory } from '../../hooks';
import { IProduct } from '@src/types/apiResponse';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsSuperAdmin } from '@src/store/selectors';
import { useDeleteProduct } from '../../hooks';
import { useToast } from '@src/components';
import { RouteProp } from '@react-navigation/native';
import { TDashboardParamList } from '@src/navigation/types';
import { useAppTheme } from '@src/theme';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@src/common/enum';
import { useTranslation } from 'react-i18next';
import styles from './styles';

type CategoryScreenRouteProp = RouteProp<TDashboardParamList, 'Category'>;

const CategoryScreen = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');
  const [deletedProducts, setDeletedProducts] = useState<number[]>([]);
  const route = useRoute<CategoryScreenRouteProp>();
  const navigation = useNavigation<StackNavigationProp<TDashboardParamList>>();
  const isSuperAdmin = useIsSuperAdmin();
  const { showSuccessToast, showErrorToast } = useToast();
  const { theme } = useAppTheme();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { category, categoryName } = route.params;

  const { productsByCategoryData, isFetching } =
    useProductsByCategory(category);

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

  const productsToShow = (productsByCategoryData || []) as IProduct[];

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

  const handleDeleteProduct = (product: IProduct) => {
    // Add to deleted products list immediately
    setDeletedProducts(prev => [...prev, product.id]);
    deleteProduct(product.id.toString());
  };

  const handleRefresh = () => {
    // Force refresh all product queries
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.PRODUCTS_BY_CATEGORY],
    });
  };

  const handleProductPress = (product: IProduct) => {
    navigation.navigate('ProductDetails', { id: product.id.toString() });
  };

  return (
    <MainLayout
      containerVariant="normalView"
      header={
        <NavigationHeader
          title={categoryName}
          subtitle={t('category.productsInCategory', { categoryName })}
          startAction={<NavigationAction.Back />}
          endAction={
            <NavigationAction.GridAndListView
              viewType={viewType}
              onPress={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
            />
          }
        />
      }
    >
      <View style={styles(theme).container}>
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
              style={styles(theme).productItem}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={handleRefresh}
              colors={['#25935F']}
              tintColor="#25935F"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles(theme).flatListContent}
          {...(viewType === 'grid'
            ? { columnWrapperStyle: styles(theme).row }
            : { rowWrapperStyle: styles(theme).row })}
        />

        {/* Loading State */}
        {isFetching && filteredProducts.length === 0 && (
          <View style={styles(theme).loadingContainer}>
            <Text textSize="size_16" fontWight="medium" color="gray500">
              {t('dashboard.loadingProducts')}
            </Text>
          </View>
        )}

        {/* Empty State */}
        {!isFetching && filteredProducts.length === 0 && (
          <View style={styles(theme).emptyContainer}>
            <Text textSize="size_18" fontWight="medium" color="gray500">
              {t('category.noProductsInCategory')}
            </Text>
            <Text textSize="size_14" fontWight="regular" color="gray400">
              {t('category.noProductsInCategoryDescription')}
            </Text>
          </View>
        )}
      </View>
    </MainLayout>
  );
};

export default CategoryScreen;
