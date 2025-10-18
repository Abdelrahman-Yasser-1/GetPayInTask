import { QUERY_KEYS } from '@src/common/enum';
import { useQuery } from '@tanstack/react-query';
import DASHBOARD_SERVICES from '../services/dashboard';

const useProduct = () => {
  const { error, data, isFetching } = useQuery({
    retry: 0,
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async () => DASHBOARD_SERVICES.getProducts(),
  });
  return {
    error,
    productsData: data,
    isFetching,
  };
};

export default useProduct;
