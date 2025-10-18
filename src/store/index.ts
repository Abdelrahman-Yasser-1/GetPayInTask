import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import { userStateSlice } from './slices/userState.slice';
import { appStatusSlice } from './slices/appStatus.slice';
import EncryptedStorage from 'react-native-encrypted-storage';

const encryptedReducers = combineReducers({
  userState: userStateSlice.reducer,
  appState: appStatusSlice.reducer,
});

// Configure encrypted storage
const encryptedConfig = {
  key: 'encrypted',
  storage: EncryptedStorage,
};

const encryptedReducerWithConfig = persistReducer(
  encryptedConfig,
  encryptedReducers,
);

const rootReducer = combineReducers({
  encrypted: encryptedReducerWithConfig,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
