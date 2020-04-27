import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import useURL from 'hooks/useURL';

const MaterialTable = () => {
  const styles = useStyles();
  const params = useURL();

  return (
    <div className={styles.root}>
      <Typography variant="h2" align="center">
        {`material-table params ${JSON.stringify(params)}`}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

MaterialTable.whyDidYouRender = true;

export default MaterialTable;
