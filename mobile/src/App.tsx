import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';

import AppProvider from '@templates/AppProvider';

import Authentication from '@pages/Authentication';

import Storebook from '../storybook';

const App: React.FC = () => {
  const theme = useTheme();

  return (
    <AppProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme?.colors?.active}
      />
      <Authentication />
    </AppProvider>
  );
};

const ENABLE_STORYBOOK = false;
export default ENABLE_STORYBOOK ? Storebook : App;
