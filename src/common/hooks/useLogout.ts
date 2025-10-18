import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from './useApp';
import { useCallback } from 'react';
import { clearTokens } from '@src/store/slices';
import { TMainStackNavigationProp } from '@src/navigation/types';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<TMainStackNavigationProp>();

  const logout = useCallback(() => {
    dispatch(clearTokens());
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  }, [dispatch, navigation]);

  return {
    logout,
  };
};

export default useLogout;
