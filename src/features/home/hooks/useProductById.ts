import { QUERY_KEYS } from '@src/common/enum';
import { useQuery } from '@tanstack/react-query';
import DASHBOARD_SERVICES from '../services/dashboard';

const useProductById = (id: string) => {
  const { error, data, isFetching, isSuccess, isError } = useQuery({
    retry: 0,
    queryKey: [QUERY_KEYS.PRODUCT_BY_ID, id],
    queryFn: async () => DASHBOARD_SERVICES.productById(id),
  });
  return {
    error,
    productByIdData: data,
    isFetching,
    isSuccess,
    isError,
  };
};

export default useProductById;
