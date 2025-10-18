import { QUERY_KEYS } from '@src/common/enum';
import { useQuery } from '@tanstack/react-query';
import DASHBOARD_SERVICES from '../services/dashboard';

const useProductsByCategory = (category: string) => {
  const { error, data, isFetching } = useQuery({
    retry: 0,
    enabled: !!category && category !== 'all',
    queryKey: [QUERY_KEYS.PRODUCTS_BY_CATEGORY, category],
    queryFn: async () => DASHBOARD_SERVICES.productsByCategory(category),
  });
  return {
    error,
    productsByCategoryData: data?.products,
    total: data?.total,
    skip: data?.skip,
    limit: data?.limit,
    isFetching,
  };
};

export default useProductsByCategory;
