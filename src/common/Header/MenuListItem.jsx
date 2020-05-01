import React, { memo } from 'react';
import { ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'common/Link';
import MenuListExpand from 'common/Header/MenuListExpand';

function MenuListItem({
  item,
  divider,
  childProp = 'media',
  isOpen,
  handleChange,
  ...rest
}) {
  const styles = useStyles(rest);

  return (
    <ListItem
      button
      divider={divider}
      disableGutters
      key={item.id}
      className={styles.root}
    >
      <Link
        to={item.path}
        className={styles.link}
        exact
        activeClassName={styles.activeLink}
      >
        <Typography variant="h6">{item.name}</Typography>
      </Link>
      {item[childProp] && (
        <MenuListExpand isOpen={isOpen} handleChange={handleChange(item.id)} />
      )}
    </ListItem>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    color:
      theme.palette.type === 'dark'
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
}));

MenuListItem.whyDidYouRender = true;

export default memo(MenuListItem);
