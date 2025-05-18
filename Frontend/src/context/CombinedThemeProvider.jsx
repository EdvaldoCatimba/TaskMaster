import React from 'react';
import { ThemeProvider as CustomThemeProvider, useTheme } from './ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Themes/Theme';

const InnerThemeProvider = ({ children }) => {
  const { theme } = useTheme();
  const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={selectedTheme}>
      {children}
    </StyledThemeProvider>
  );
};

export const CombinedThemeProvider = ({ children }) => (
  <CustomThemeProvider>
    <InnerThemeProvider>{children}</InnerThemeProvider>
  </CustomThemeProvider>
);
