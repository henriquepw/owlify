import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Authentication from '@pages/Authentication';
import Dashboard from '@pages/Dashboard';

import { useAuth } from '@hooks/auth';

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {
  const { token } = useAuth();
  const theme = useTheme();

  if (!token) return <Authentication />;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colours.active,
        inactiveTintColor: theme.colours.withoutFocus,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return (
            <Icon name={route.name.toLowerCase()} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default Routes;
