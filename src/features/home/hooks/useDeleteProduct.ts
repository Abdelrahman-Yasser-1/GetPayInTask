import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@src/common/enum';
import ICustomQueryMutationOptions from '@src/types/customQueryMutationOptions';

const useDeleteProduct = (
  options?: ICustomQueryMutationOptions<
    { id: number; isDeleted: boolean },
    Error
  >,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate local deletion without API call
      console.log(`Deleting product ${id} locally...`);
      return { id: parseInt(id), isDeleted: true };
    },
    onSuccess: (data, id) => {
      // Update the cache locally by removing the deleted product
      const productId = parseInt(id);

      console.log(`Deleting product ${productId} from cache...`);

      // Force invalidate all queries first
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCTS_BY_CATEGORY],
      });

      // Then update the cache
      queryClient.setQueryData([QUERY_KEYS.PRODUCTS], (oldData: any) => {
        if (!oldData?.products) {
          console.log('No products data in cache');
          return oldData;
        }

        const filteredProducts = oldData.products.filter(
          (product: any) => product.id !== productId,
        );

        const updatedData = {
          ...oldData,
          products: filteredProducts,
          total: filteredProducts.length,
        };

        console.log(
          'Updated products cache - before:',
          oldData.products.length,
        );
        console.log('Updated products cache - after:', filteredProducts.length);
        return updatedData;
      });

      // Update all products by category caches
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.PRODUCTS_BY_CATEGORY] },
        (oldData: any) => {
          if (!oldData) return oldData;
          const updatedData = oldData.filter(
            (product: any) => product.id !== productId,
          );
          console.log('Updated category cache:', updatedData);
          return updatedData;
        },
      );

      console.log(`Product ${id} deleted locally:`, data);
    },
    onError: (error: Error) => {
      console.error('Error deleting product:', error);
    },
    ...options,
  });

  return {
    deleteProduct: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    isPending: mutation.isPending,
  };
};

export default useDeleteProduct;
