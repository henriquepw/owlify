import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import GatewayRegistration from '@pages/GatewayRegistration';
import Registration from '@pages/Registration';

const { Navigator, Screen } = createStackNavigator();

const RegistrationRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Registration" component={Registration} />
      <Screen name="GatewayRegistration" component={GatewayRegistration} />
    </Navigator>
  );
};

export default RegistrationRoutes;
