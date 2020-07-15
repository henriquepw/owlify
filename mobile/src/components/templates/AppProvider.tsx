import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from '@hooks/auth';
import { DevicesProvider } from '@hooks/devices';

import { light } from '@styles/themes';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>
    <AuthProvider>
      <DevicesProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </DevicesProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
