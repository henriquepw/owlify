import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Authentication from '@pages/Authentication';
import Dashboard from '@pages/Dashboard';

import { useAuth } from '@hooks/auth';

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {
  const { token } = useAuth();

  if (!token) return <Authentication />;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default Routes;
