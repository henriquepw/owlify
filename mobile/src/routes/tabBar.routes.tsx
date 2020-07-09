import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '@molecules/TabBar';

import Dashboard from '@pages/Dashboard';

const { Navigator, Screen } = createBottomTabNavigator();

const iconNames = ['home', 'list', 'plus', 'bell', 'user'];

const TabBarRoutes: React.FC = () => {
  return (
    <Navigator tabBar={(props) => <TabBar {...props} iconNames={iconNames} />}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="List" component={Dashboard} />
      <Screen name="Registration" component={Dashboard} />
      <Screen name="Notification" component={Dashboard} />
      <Screen name="Profile" component={Dashboard} />
    </Navigator>
  );
};

export default TabBarRoutes;
