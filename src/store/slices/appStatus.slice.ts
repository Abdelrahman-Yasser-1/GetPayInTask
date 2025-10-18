import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface appStatusType {
  isLoading: boolean;
  networkStatus: 'offline' | 'online' | 'unknown';
  isOffline: boolean;
  isOnline: boolean;
  connectionType: string | null;
  locked: boolean;
}

const initialState: appStatusType = {
  isLoading: false,
  networkStatus: 'online',
  isOffline: false,
  isOnline: true,
  connectionType: null,
  locked: false,
};

export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,

  reducers: {
    setIsLoading: (
      state,
      action: PayloadAction<appStatusType['isLoading']>,
    ) => {
      state.isLoading = action.payload;
    },
    setNetworkStatus: (
      state,
      action: PayloadAction<appStatusType['networkStatus']>,
    ) => {
      state.networkStatus = action.payload;
    },
    setIsOffline: (
      state,
      action: PayloadAction<appStatusType['isOffline']>,
    ) => {
      state.isOffline = action.payload;
      state.isOnline = !action.payload;
    },
    setIsOnline: (state, action: PayloadAction<appStatusType['isOnline']>) => {
      state.isOnline = action.payload;
      state.isOffline = !action.payload;
    },
    setConnectionType: (
      state,
      action: PayloadAction<appStatusType['connectionType']>,
    ) => {
      state.connectionType = action.payload;
    },
    setLocked: (state, action: PayloadAction<appStatusType['locked']>) => {
      state.locked = action.payload;
    },
    resetAppStatus: state => {
      state.isLoading = false;
      state.networkStatus = 'online';
      state.isOffline = false;
      state.isOnline = true;
      state.connectionType = null;
      state.locked = false;
    },
  },
});

export const {
  setIsLoading,
  setNetworkStatus,
  setIsOffline,
  setIsOnline,
  setConnectionType,
  setLocked,
  resetAppStatus,
} = appStatusSlice.actions;

export default appStatusSlice.reducer;
