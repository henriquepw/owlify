import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import AppProvider from '@templates/AppProvider';

import Authentication from '@pages/Authentication';

import Storebook from '../storybook';

const App: React.FC = () => {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#6BA7AF" />
      <Authentication />
    </AppProvider>
  );
};

const ENABLE_STORYBOOK = false;
export default ENABLE_STORYBOOK ? Storebook : App;
