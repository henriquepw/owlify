import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { AuthProvider } from '@hooks/auth';

import { light } from '@styles/themes';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
