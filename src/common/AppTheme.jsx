import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const AppTheme = ({ children }) => {
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isDark = true;

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            type: isDark ? 'dark' : 'light',
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
      ),
    [isDark]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
