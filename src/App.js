import React from 'react';
import { CssBaseline } from '@material-ui/core';
import AppTheme from 'common/AppTheme';
import Pages from 'Pages';

const App = () => (
  <React.StrictMode>
    <AppTheme>
      <CssBaseline />
      <Pages />
    </AppTheme>
  </React.StrictMode>
);

App.whyDidYouRender = true;

export default App;
