import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
