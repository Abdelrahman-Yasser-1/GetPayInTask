import { useAppSelector } from '@src/common/hooks';
import { RootState } from '@src/store';

const selectNetworkStatusState = ({ encrypted }: RootState) =>
  encrypted.appState.networkStatus;
const selectIsOfflineState = ({ encrypted }: RootState) =>
  encrypted.appState.isOffline;
const selectIsOnlineState = ({ encrypted }: RootState) =>
  encrypted.appState.isOnline;
const selectConnectionTypeState = ({ encrypted }: RootState) =>
  encrypted.appState.connectionType;
const selectLockedState = ({ encrypted }: RootState) =>
  encrypted.appState.locked;

export const useNetworkStatus = () => useAppSelector(selectNetworkStatusState);
export const useIsOffline = () => useAppSelector(selectIsOfflineState);
export const useIsOnline = () => useAppSelector(selectIsOnlineState);
export const useConnectionType = () =>
  useAppSelector(selectConnectionTypeState);
export const useLocked = () => useAppSelector(selectLockedState);
