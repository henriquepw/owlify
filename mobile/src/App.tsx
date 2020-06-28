import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

import AppProvider from '@templates/AppProvider';

import Storebook from '../storybook';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text>Hello</Text>
        </SafeAreaView>
      </AppProvider>
    </>
  );
};

const ENABLE_STORYBOOK = true;
export default ENABLE_STORYBOOK ? Storebook : App;
