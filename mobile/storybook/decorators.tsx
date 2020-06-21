import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { addDecorator } from '@storybook/react-native';

import { light } from '../src/styles/themes';

type StoryFn = () => React.ReactNode;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

addDecorator((storyFn: StoryFn) => (
  <View style={{ ...styles.center, padding: 24 }}>
    <ThemeProvider theme={light}>{storyFn()}</ThemeProvider>
  </View>
));

export const backgroundDark = (storyFn: StoryFn): React.ReactNode => (
  <View
    style={{
      ...styles.center,
      backgroundColor: 'black',
      width: '100%',
      height: '100%',
    }}
  >
    {storyFn()}
  </View>
);
