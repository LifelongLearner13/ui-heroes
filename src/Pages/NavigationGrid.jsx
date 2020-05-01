import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import CardGrid from 'common/CardGrid';
import ConfigContext from 'contexts/ConfigContext';
import useURL from 'hooks/useURL';

/**
 * NavigationGrid page which displays links to the various technologies.
 */
const NavigationGrid = () => {
  const styles = useStyles();
  const config = useContext(ConfigContext);
  const {
    params: { technology },
  } = useURL();

  const technologies = config[technology]
    ? Object.values(config[technology].media)
    : Object.values(config);

  return (
    <main className={styles.root}>
      <Typography variant="h1" align="center">
        Technologies
      </Typography>
      <CardGrid contents={technologies} />
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 0, 0),
    flexGrow: 1,
  },
}));

NavigationGrid.whyDidYouRender = true;

export default NavigationGrid;
