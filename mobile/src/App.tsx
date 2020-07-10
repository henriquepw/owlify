import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import AppProvider from '@templates/AppProvider';

import Storebook from '../storybook';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#6BA7AF" />
      <Routes />
    </AppProvider>
  );
};

const ENABLE_STORYBOOK = false;
export default ENABLE_STORYBOOK ? Storebook : App;
