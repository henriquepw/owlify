import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Authentication from '@pages/Authentication';
import ShowGateway from '@pages/ShowGateway';

import { useAuth } from '@hooks';

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
      <Root.Screen name="Home" component={TabBarRoutes} />
      <Root.Screen name="Registration" component={RegistrationRoutes} />
      <Root.Screen name="ShowGateway" component={ShowGateway} />
    </Root.Navigator>
  );
};

export default Routes;
