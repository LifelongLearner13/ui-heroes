import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const TechnologyCard = ({
  imageSrc,
  imageAlt = 'Technology Logo',
  name = 'Technology Logo'
}) => {
  const styles = useStyles();

  if (!imageSrc) {
    return null;
  }

  return (
    <Card className={styles.root}>
      <CardMedia className={styles.imageWrapper}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </CardMedia>
      <CardContent>
        <Typography variant="h2" align="center" className={styles.contentTitle}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  imageWrapper: {
    height: theme.spacing(20),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.type === 'dark' ? grey[900] : grey[300]
  },
  image: {
    height: '100%',
    margin: '0 auto',
    display: 'block'
  },
  contentTitle: {
    color: theme.palette.secondary.main,
    fontWeight: 500,
    'a:hover &, a:focus &': {
      fontWeight: 600,
      color: theme.palette.secondary.dark
    },
    'a:visited &, a:active &': {
      color: theme.palette.secondary.main,
      fontWeight: 500
    }
  }
}));

export default TechnologyCard;
