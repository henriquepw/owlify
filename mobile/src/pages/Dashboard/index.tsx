import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import TabFragment from '@templates/TabFragment';

import { useAuth } from '@hooks/auth';

// import * as S from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <TabFragment title="Dashboard">
      <RectButton onPress={signOut}>
        <Text>Sign out</Text>
      </RectButton>
    </TabFragment>
  );
};

export default Dashboard;
