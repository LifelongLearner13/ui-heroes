import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import Link from 'common/Link';
import TechnologyCard from 'common/TechnologyCard';
import technologyRoutes from 'Pages/Technologies/routes';

import materialTableLogo from 'images/material-table-logo.png';
import tubularReactLogo from 'images/tubular-react-logo.png';

/*
  @NOTE: Slightly unorthodox, this allows for the mapping of imported images to
  identifying strings in `TechnologyRoutes`
*/
const images = {
  materialTableLogo,
  tubularReactLogo,
};

/**
 * Home page which displays links to the various technologies.
 */
const Home = () => {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <Typography variant="h1" align="center">
        Technologies
      </Typography>
      <Grid container spacing={2} classes={{ root: styles.container }}>
        {Object.values(technologyRoutes).map((technology) => (
          <Grid
            item
            xs={6}
            key={technology.id}
            component={Link}
            to={technology.path}
            className={styles.link}
          >
            <TechnologyCard
              {...technology}
              imageSrc={images[technology.imageSrc]}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 0, 0),
    flexGrow: 1,
  },
  container: {
    width: '80%',
    margin: `${theme.spacing(8)}px auto 0px`,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
  },
}));

Home.whyDidYouRender = true;

export default Home;
