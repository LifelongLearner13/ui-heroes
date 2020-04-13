import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const DataView = () => {
  const styles = useStyles();

  return (
    <Grid item classes={{ root: styles.root }}>
      <Typography variant={'h1'}>DataView</Typography>
    </Grid>
  );
};

export default DataView;
