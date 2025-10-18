import { useAppSelector } from '@src/common/hooks';
import { RootState } from '@src/store';

const selectAccessTokenState = ({ encrypted }: RootState) =>
  encrypted.userState.accessToken;
const selectRefreshTokenState = ({ encrypted }: RootState) =>
  encrypted.userState.refreshToken;

const selectIsSuperAdminState = ({ encrypted }: RootState) =>
  encrypted.userState.isSuperAdmin;

export const useAccessToken = () => useAppSelector(selectAccessTokenState);
export const useRefreshToken = () => useAppSelector(selectRefreshTokenState);
export const useIsSuperAdmin = () => useAppSelector(selectIsSuperAdminState);
