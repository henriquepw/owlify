import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from '@hooks/auth';

import { light } from '@styles/themes';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>
    <AuthProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
