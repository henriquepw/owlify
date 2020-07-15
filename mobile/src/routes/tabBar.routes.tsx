import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '@molecules/TabBar';

import Dashboard from '@pages/Dashboard';
import List from '@pages/List';
import Notifications from '@pages/Notifications';

const { Navigator, Screen } = createBottomTabNavigator();

const iconNames = ['home', 'list', 'plus', 'bell', 'user'];

const TabBarRoutes: React.FC = () => {
  return (
    <Navigator
      tabBar={(props) => <TabBar {...props} iconNames={iconNames} />}
      initialRouteName="List"
    >
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="List" component={List} />
      <Screen name="Registration" component={Dashboard} />
      <Screen name="Notifications" component={Notifications} />
      <Screen name="Profile" component={Dashboard} />
    </Navigator>
  );
};

export default TabBarRoutes;
