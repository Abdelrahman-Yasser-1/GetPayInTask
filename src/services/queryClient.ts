import { QueryClient } from '@tanstack/react-query';
import { storage } from '@src/common/utils/MMKStorage';
import { MMKV_KEYS } from '@src/common/enum';

// Custom MMKV persister for React Query
const createMMKVPersister = () => ({
  persistClient: async (client: any) => {
    try {
      const serializedClient = JSON.stringify(client);
      storage.set(MMKV_KEYS.REACT_QUERY_CACHE, serializedClient);
      console.log('✅ React Query cache persisted to MMKV');
    } catch (error) {
      console.error('❌ Error persisting React Query cache:', error);
    }
  },
  restoreClient: async () => {
    try {
      const cachedData = storage.getString(MMKV_KEYS.REACT_QUERY_CACHE);
      if (cachedData) {
        console.log('✅ React Query cache restored from MMKV');
        return JSON.parse(cachedData);
      }
      console.log('ℹ️ No cached data found in MMKV');
      return undefined;
    } catch (error) {
      console.error('❌ Error restoring React Query cache:', error);
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      storage.delete(MMKV_KEYS.REACT_QUERY_CACHE);
      console.log('🗑️ React Query cache removed from MMKV');
    } catch (error) {
      console.error('❌ Error removing React Query cache:', error);
    }
  },
});

// Create QueryClient with MMKV persistence
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Initialize persistence
const persister = createMMKVPersister();

// Restore cache on app start
persister.restoreClient().then(cachedClient => {
  if (cachedClient) {
    // Hydrate the query client with cached data
    queryClient.setQueryData(['hydrate'], cachedClient);
  }
});

export { persister };
