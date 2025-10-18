import { useMutation } from '@tanstack/react-query';
import { IGetUserInfoRes } from '@src/types/apiResponse';
import ICustomQueryMutationOptions from '@src/types/customQueryMutationOptions';
import AUTH_SERVICES from '../services/auth';

const useGetUserInfo = (
  options?: ICustomQueryMutationOptions<IGetUserInfoRes, IGetUserInfoRes>,
) => {
  const mutation = useMutation({
    mutationFn: async () => AUTH_SERVICES.getUserInfo(),
    ...options,
  });

  return {
    getUserInfo: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    isPending: mutation.isPending,
  };
};

export default useGetUserInfo;
