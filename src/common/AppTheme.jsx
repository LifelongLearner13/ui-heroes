import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: grey[900],
      },
      secondary: {
        main: '#ed1d24',
      },
    },
    typography: {
      fontSize: 12,
    },
    overrides: {},
  })
);

const AppTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

AppTheme.whyDidYouRender = true;

export default AppTheme;
