import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import useURL from 'hooks/useURL';

const TubularReact = () => {
  const styles = useStyles();
  const params = useURL();

  return (
    <div className={styles.root}>
      <Typography variant="h2" align="center">
        {`Tubular React params ${JSON.stringify(params)}`}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

TubularReact.whyDidYouRender = true;

export default TubularReact;
