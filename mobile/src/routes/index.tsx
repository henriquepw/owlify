import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

/* import Authentication from '@pages/Authentication'; */
import Notification from '@pages/Notifications';

import { useAuth } from '@hooks/auth';

import RegistrationRoutes from './registration.routes';
import TabBarRoutes from './tabBar.routes';

const Root = createStackNavigator();

const Routes: React.FC = () => {
  const { token } = useAuth();

  /* if (!token) return <Authentication />; */
  if (!token) return <Notification />;

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Root.Screen name="Home" component={TabBarRoutes} />
      <Root.Screen name="Registration" component={RegistrationRoutes} />
    </Root.Navigator>
  );
};

export default Routes;
