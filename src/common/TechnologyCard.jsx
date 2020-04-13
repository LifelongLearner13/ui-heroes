import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  imageWrapper: {
    height: theme.spacing(20)
  },
  image: {
    height: '100%',
    margin: '0 auto',
    display: 'block'
  }
}));

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
        <Typography variant="h2">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default TechnologyCard;
