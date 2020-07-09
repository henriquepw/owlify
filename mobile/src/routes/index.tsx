import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Authentication from '@pages/Authentication';

import { useAuth } from '@hooks/auth';

import RegistrationRoutes from './registration.routes';
import TabBarRoutes from './tabBar.routes';

const Root = createStackNavigator();

const Routes: React.FC = () => {
  const { token } = useAuth();

  if (!token) return <Authentication />;

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Root.Screen name="TabBar" component={TabBarRoutes} />
      <Root.Screen name="Registration" component={RegistrationRoutes} />
    </Root.Navigator>
  );
};

export default Routes;
