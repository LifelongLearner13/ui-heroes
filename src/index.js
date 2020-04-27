import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import AppTheme from 'common/AppTheme';
import App from 'App';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <AppTheme>
      <CssBaseline />
      <App />
    </AppTheme>
  </React.StrictMode>,
  rootElement
);
