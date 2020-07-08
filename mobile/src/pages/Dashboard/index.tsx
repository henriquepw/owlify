import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '@hooks/auth';

import * as S from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <S.Container>
      <Text>Dashboard</Text>
      <RectButton onPress={signOut}>
        <Text>Sign out</Text>
      </RectButton>
    </S.Container>
  );
};

export default Dashboard;
