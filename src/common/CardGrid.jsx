import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Link from 'common/Link';
import Card from 'common/TechnologyCard';

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

const CardGrid = ({ contents }) => {
  const styles = useStyles();

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      alignContent="center"
      classes={{ root: styles.container }}
    >
      {contents.map((content) => (
        <Grid
          item
          xs={12}
          lg={6}
          xl={4}
          key={content.id}
          component={Link}
          to={content.path}
        >
          <Card {...content} imageSrc={images[content.imageSrc]} />
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80%',
    margin: `${theme.spacing(3)}px auto`,
    padding: 0,
  },
}));

CardGrid.whyDidYouRender = true;

export default CardGrid;
