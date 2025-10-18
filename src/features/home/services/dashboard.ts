import { HttpClient } from '@src/services';
import API_END_POINTS from '@src/services/apiEndPoints';
import {
  ICategoriesRes,
  IProductByIdRes,
  IProductsByCategoryRes,
  IProductsRes,
} from '@src/types/apiResponse';

const DASHBOARD_SERVICES = {
  getCategories: (): Promise<ICategoriesRes> =>
    HttpClient.get(API_END_POINTS.PRODUCTS_CATEGORIES)
      .then(res => res.data)
      .catch(error => {
        console.error('Error in getCategories:', error);
        throw error;
      }),

  getProducts: (): Promise<IProductsRes> =>
    HttpClient.get(API_END_POINTS.PRODUCTS)
      .then(res => res.data)
      .catch(error => {
        console.error('Error in getProducts:', error);
        throw error;
      }),

  productsByCategory: (category: string): Promise<IProductsByCategoryRes> =>
    HttpClient.get(
      API_END_POINTS.PRODUCTS_BY_CATEGORY.replace('{category}', category),
    )
      .then(res => res.data)
      .catch(error => {
        console.error('Error in productsByCategory:', error);
        throw error;
      }),

  productById: (id: string): Promise<IProductByIdRes> =>
    HttpClient.get(API_END_POINTS.PRODUCTS_BY_ID.replace('{id}', id))
      .then(res => res.data)
      .catch(error => {
        console.error('Error in productById:', error);
        throw error;
      }),

  deleteProduct: (id: string): Promise<{ id: number; isDeleted: boolean }> =>
    HttpClient.delete(API_END_POINTS.PRODUCTS_DELETE.replace('{id}', id))
      .then(res => res.data)
      .catch(error => {
        console.error('Error in deleteProduct:', error);
        throw error;
      }),
};

export default DASHBOARD_SERVICES;
