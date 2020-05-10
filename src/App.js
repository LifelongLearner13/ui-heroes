import React, { StrictMode } from 'react';
import { CssBaseline } from '@material-ui/core';
import AppTheme from 'common/AppTheme';
import ErrorBoundary from 'common/ErrorBoundary';
import Pages from 'Pages';

const App = () => (
  <StrictMode>
    {/* StrictMode intintiallly rerenders components twice on first
        load to reveal any unintentional side effects. */}
    <AppTheme>
      <CssBaseline />
      <ErrorBoundary>
        <Pages />
      </ErrorBoundary>
    </AppTheme>
  </StrictMode>
);

App.whyDidYouRender = true;

export default App;
