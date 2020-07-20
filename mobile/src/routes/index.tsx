import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Authentication from '@pages/Authentication';
import ShowEndnode from '@pages/ShowEndnode';
import ShowGateway from '@pages/ShowGateway';

import { useAuth } from '@hooks';
import { DevicesProvider } from '@hooks/devices';

import RegistrationRoutes from './registration.routes';
import TabBarRoutes from './tabBar.routes';

const Root = createStackNavigator();

const Routes: React.FC = () => {
  const { token, isLoading } = useAuth();

  // TODO: add slash screen when is loading
  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6BA7AF" />
      </View>
    );

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
