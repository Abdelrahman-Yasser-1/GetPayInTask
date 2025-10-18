export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  thumbnail: string;
}

export interface IProductsRes {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
