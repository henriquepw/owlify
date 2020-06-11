import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

import AppProvider from './components/templates/AppProvider';

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

export default App;
