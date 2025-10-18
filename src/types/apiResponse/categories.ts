// {
//     "slug": "beauty",
//     "name": "Beauty",
//     "url": "https://dummyjson.com/products/category/beauty"
//   },
//   {
//     "slug": "fragrances",
//     "name": "Fragrances",
//     "url": "https://dummyjson.com/products/category/fragrances"
//   },
//   {
//     "slug": "furniture",
//     "name": "Furniture",
//     "url": "https://dummyjson.com/products/category/furniture"
//   },

export interface ICategory {
  slug: string;
  name: string;
  url: string;
}

export interface ICategoriesRes extends Array<ICategory> {
  // categories: ICategory[];
}
