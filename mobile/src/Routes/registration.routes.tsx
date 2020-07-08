import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Registration from '@pages/Registration';

const { Navigator, Screen } = createStackNavigator();

const RegistrationRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Registration" component={Registration} />
    </Navigator>
  );
};

export default RegistrationRoutes;
