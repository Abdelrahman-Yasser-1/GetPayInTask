import { useMutation } from '@tanstack/react-query';
import { ILoginDto } from '@src/types/dto';
import { ILoginRes } from '@src/types/apiResponse';
import ICustomQueryMutationOptions from '@src/types/customQueryMutationOptions';
import AUTH_SERVICES from '../services/auth';

const useLogin = (
  params: ILoginDto,
  options?: ICustomQueryMutationOptions<ILoginRes, ILoginRes>,
) => {
  const mutation = useMutation({
    mutationFn: async () => AUTH_SERVICES.login(params),
    ...options,
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    isPending: mutation.isPending,
  };
};

export default useLogin;
