import React, { useContext, useMemo } from 'react';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ConfigContext from 'contexts/ConfigContext';
import MenuList from 'common/Header/MenuList';

function MenuDrawer({ open, handleDrawerClose }) {
  const styles = useStyles();
  const config = useContext(ConfigContext);

  const menuItems = useMemo(
    () =>
      Object.values(config).reduce(
        (acc, cur) => {
          acc.push({
            ...cur,
            ...(cur.media ? { media: Object.values(cur.media) } : {}),
          });
          return acc;
        },
        [
          {
            name: 'Home',
            path: '/',
            id: 'home',
          },
        ]
      ),
    [config]
  );

  console.log('menuItems: ', menuItems);

  return (
    <Drawer open={open} onClose={handleDrawerClose}>
      <div
        tabIndex={0}
        role="button"
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={styles.list}>
          <MenuList items={menuItems} />
        </div>
      </div>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

MenuDrawer.whyDidYouRender = true;

export default MenuDrawer;
