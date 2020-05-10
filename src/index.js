import React from 'react';
import { render } from 'react-dom';
import App from 'App';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const renderApp = () => render(<App />, document.getElementById('root'));

renderApp();

if (module.hot) {
  module.hot.accept('App', () => renderApp());
}
