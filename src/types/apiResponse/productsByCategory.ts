import { IProduct } from './products';

export interface IProductsByCategoryRes {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
