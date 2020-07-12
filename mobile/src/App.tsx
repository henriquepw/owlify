import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';

import AppProvider from '@templates/AppProvider';

import Storebook from '../storybook';
import Routes from './routes';

// Bringing the native navigation component
enableScreens();

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
