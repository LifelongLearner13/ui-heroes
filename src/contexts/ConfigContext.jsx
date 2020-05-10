import React, { createContext } from 'react';
import genConfig from 'utils/config';

const Context = createContext({});

const config = genConfig();

export const ConfigContextProvider = ({ children }) => (
  <Context.Provider value={config}>{children}</Context.Provider>
);

ConfigContextProvider.whyDidYouRender = true;

export default Context;
