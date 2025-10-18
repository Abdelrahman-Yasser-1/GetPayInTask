import { QUERY_KEYS } from '@src/common/enum';
import { useQuery } from '@tanstack/react-query';
import DASHBOARD_SERVICES from '../services/dashboard';

const useCategories = () => {
  const { error, data, isFetching } = useQuery({
    retry: 0,
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => DASHBOARD_SERVICES.getCategories(),
  });

  return {
    error,
    categoriesData: data,
    isFetching,
  };
};

export default useCategories;
