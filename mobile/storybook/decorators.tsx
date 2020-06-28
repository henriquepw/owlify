import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { addDecorator } from '@storybook/react-native';

import { light } from '@styles/themes';

addDecorator((storyFn: () => React.ReactNode) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}
  >
    <ThemeProvider theme={light}>{storyFn()}</ThemeProvider>
  </View>
));
