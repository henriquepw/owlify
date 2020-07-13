import React from 'react';
import { Button } from 'react-native';

import TabFragment from '@templates/TabFragment';

import { useAuth } from '@hooks/auth';

// import * as S from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <TabFragment title="Dashboard">
      <Button onPress={signOut} title="Sign out" />
    </TabFragment>
  );
};

export default Dashboard;
