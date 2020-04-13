import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';

import materialTableLogo from 'images/material-table-logo.png';
import tubularReactLogo from 'images/tubular-react-logo.png';
import TechnologyCard from './common/TechnologyCard';

const technologies = {
  materialTable: {
    imageSrc: materialTableLogo,
    imageAlt: 'Material-Table logo',
    name: 'Material-Table',
    path: '/material-table',
    id: 'material-table'
  },
  tubularReact: {
    imageSrc: tubularReactLogo,
    imageAlt: 'Tubular-React logo',
    name: 'Tubular-React',
    path: '/tubular-react',
    id: 'tubular-react'
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Home = () => {
  const styles = useStyles();

  return (
    <Grid container spacing={2} item classes={{ root: styles.root }}>
      <Grid item xs={12}>
        <Typography variant={'h1'}>Home</Typography>
      </Grid>

      {Object.values(technologies).map(technology => (
        <Grid item xs={6} key={technology.id}>
          <TechnologyCard {...technology} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
