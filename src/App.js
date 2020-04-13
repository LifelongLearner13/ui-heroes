import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataView from 'DataView';
import Header from 'Header';
import Home from 'Home';
import AppTheme from 'AppTheme';
import Attribution from 'Attribution';
import { Grid, CssBaseline } from '@material-ui/core';

export default function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <Grid
        container
        spacing={2}
        direction={'column'}
        style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}
      >
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/heros">
              <DataView />
            </Route>
          </Switch>
        </Router>
        <Attribution />
      </Grid>
    </AppTheme>
  );
}
