import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const MenuListExpand = ({ isOpen, handleChange }) => (
  <ListItemSecondaryAction>
    <IconButton onClick={handleChange}>
      {isOpen ? <ExpandLess /> : <ExpandMore />}
    </IconButton>
  </ListItemSecondaryAction>
);

export default memo(MenuListExpand);
