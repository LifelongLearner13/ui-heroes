import React from 'react';
import { AppBar, Toolbar, Grid } from '@material-ui/core';

function Header() {
  return (
    <Grid item>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </Grid>
  );
}

export default Header;
