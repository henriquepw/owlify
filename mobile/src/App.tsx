import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';

import AppProvider from '@templates/AppProvider';

import { ENABLE_STORYBOOK } from '../env.json';
import Storebook from '../storybook';
import Routes from './routes';

// Bringing the native navigation component
enableScreens();

// @temporaty: ignore requie cycle for use SWR lib
LogBox.ignoreLogs(['Require cycle:']);

const App: React.FC = () => {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#6BA7AF" />
      <Routes />
    </AppProvider>
  );
};

export default ENABLE_STORYBOOK ? Storebook : App;
