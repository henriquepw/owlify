import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '@molecules/TabBar';

import Authentication from '@pages/Authentication';
import Dashboard from '@pages/Dashboard';

import { useAuth } from '@hooks/auth';

import RegistrationRoutes from './registration.routes';

const Tab = createBottomTabNavigator();

const iconNames = ['home', 'list', 'plus', 'bell', 'user'];

const Routes: React.FC = () => {
  const { token } = useAuth();

  if (!token) return <Authentication />;

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} iconNames={iconNames} />}
    >
      <Tab.Screen name="dashboard" component={Dashboard} />
      <Tab.Screen name="list" component={Dashboard} />
      <Tab.Screen name="registration" component={RegistrationRoutes} />
      <Tab.Screen name="notification" component={Dashboard} />
      <Tab.Screen name="profile" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default Routes;
