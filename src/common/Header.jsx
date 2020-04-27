import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

function Header() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));

Header.whyDidYouRender = true;

export default Header;
