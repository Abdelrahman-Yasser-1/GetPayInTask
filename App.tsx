import React from 'react';
import ProvidersWrapper from '@src/ProvidersWrapper';
import { MainStack } from '@src/navigation';
import '@src/translation';
import LockScreen from '@src/features/lock/screens/LockScreen';
import UserInteractionWrapper from '@src/common/components/UserInteractionWrapper';
import { NetworkStatus } from '@src/components';

const App = () => {
  return (
    <ProvidersWrapper>
      <UserInteractionWrapper>
        <NetworkStatus />
        <MainStack />
        <LockScreen />
      </UserInteractionWrapper>
    </ProvidersWrapper>
  );
};

export default App;
