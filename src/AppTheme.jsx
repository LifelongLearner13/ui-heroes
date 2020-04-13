import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const AppTheme = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
              main: grey[900],
            },
            secondary: red,
          },
        })
      ),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
