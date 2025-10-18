import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@src/common/enum';
// import { HOME_SERVICES } from '../services';

const useDashboard = () => {
  const { error, data, isFetching } = useQuery({
    retry: 0,
    queryKey: [QUERY_KEYS.DASHBOARD], // add the query key to the object
    queryFn: async () => () => {},
  });

  return {
    error,
    dashboardData: data,
    isFetching,
  };
};

export default useDashboard;
