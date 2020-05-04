import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const Attribution = () => {
  const styles = useStyles();
  return (
    <footer className={styles.root}>
      <Typography variant="subtitle1" component="h3">
        Data provided by Marvel. © 2020 Marvel
      </Typography>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export default Attribution;
