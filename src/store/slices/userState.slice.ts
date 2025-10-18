import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userStateType {
  accessToken?: string;
  refreshToken?: string;
  isSuperAdmin?: boolean;
}

const initialState: userStateType = {
  accessToken: '',
  refreshToken: '',
  isSuperAdmin: false,
};

export const userStateSlice = createSlice({
  name: 'userState',
  initialState,

  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<userStateType['accessToken']>,
    ) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (
      state,
      action: PayloadAction<userStateType['refreshToken']>,
    ) => {
      state.refreshToken = action.payload;
    },
    setTokens: (state, action: PayloadAction<userStateType>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
    setIsSuperAdmin: (
      state,
      action: PayloadAction<userStateType['isSuperAdmin']>,
    ) => {
      state.isSuperAdmin = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setTokens,
  clearTokens,
  setIsSuperAdmin,
} = userStateSlice.actions;

export default userStateSlice.reducer;
