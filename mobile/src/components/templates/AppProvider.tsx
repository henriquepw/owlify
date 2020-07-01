import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { light } from '@styles/themes';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);

export default AppProvider;
