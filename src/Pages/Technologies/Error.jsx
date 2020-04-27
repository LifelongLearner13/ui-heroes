import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const Error = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Typography variant="h2" align="center">
        There was a error Loading the requested Technology
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

Error.whyDidYouRender = true;

export default Error;
