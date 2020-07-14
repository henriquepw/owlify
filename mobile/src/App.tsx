import React from 'react';
/* import { SafeAreaView, Text, StatusBar } from 'react-native'; */

import AppProvider from '@templates/AppProvider';

import Profile from './pages/Profile';

import Storebook from '../storybook';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Profile />
      </AppProvider>
    </>
  );
};

const ENABLE_STORYBOOK = false;
export default ENABLE_STORYBOOK ? Storebook : App;
