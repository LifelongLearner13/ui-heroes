import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import MenuDrawer from 'common/Header/MenuDrawer';

function Header() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => setOpen(false);
  const handleDrawerOpen = () => setOpen(true);

  return (
    <div className={styles.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(styles.menuButton, open && styles.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <MenuDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
}));

Header.whyDidYouRender = true;

export default Header;
