import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { createStackNavigator } from '@react-navigation/stack';

import Authentication from '@pages/Authentication';
// import Notification from '@pages/Notifications';
import ShowEndnode from '@pages/ShowEndnode';
import ShowGateway from '@pages/ShowGateway';

import { useAuth } from '@hooks';
import { DevicesProvider } from '@hooks/devices';

import RegistrationRoutes from './registration.routes';
import TabBarRoutes from './tabBar.routes';

const Root = createStackNavigator();

const Routes: React.FC = () => {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (!token) return <Authentication />;

  return (
    <DevicesProvider>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name="Home" component={TabBarRoutes} />
        <Root.Screen name="Registration" component={RegistrationRoutes} />

        <Root.Screen name="ShowGateway" component={ShowGateway} />
        <Root.Screen name="ShowEndnode" component={ShowEndnode} />
      </Root.Navigator>
    </DevicesProvider>
  );
};

export default Routes;
