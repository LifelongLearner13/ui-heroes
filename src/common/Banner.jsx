import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import WarningIcon from '@material-ui/icons/WarningOutlined';
import SuccessIcon from '@material-ui/icons/CheckCircleOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const avatarMap = {
  error: ErrorIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  info: InfoIcon,
};

/**
 * Full width page banner based on Material design specifications.
 */
const Banner = ({ type = Banner.TYPE.info, message, dismiss }) => {
  const styles = useStyles({ type });
  const AvatarIcon = Banner.TYPE[type]
    ? avatarMap[type]
    : avatarMap[Banner.TYPE.info];
  return (
    <Fragment>
      <Paper elevation={0} className={styles.paper}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar className={styles.avatar}>
              <AvatarIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h2" className={styles.message}>
              {message}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-end" spacing={8}>
          <Grid item>
            <Button
              variant="contained"
              className={styles.dismiss}
              onClick={dismiss}
              startIcon={<CloseIcon />}
            >
              <Typography>Dismiss</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Divider />
    </Fragment>
  );
};

Banner.TYPE = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2, 4),
  },
  message: ({ type }) => ({
    fontSize: '1.5rem',
    color: theme.palette[type]
      ? theme.palette[type].dark
      : theme.palette.info.dark,
  }),
  avatar: ({ type }) => ({
    backgroundColor: theme.palette[type]
      ? theme.palette[type].dark
      : theme.palette.info.dark,
  }),
  dismiss: ({ type }) => ({
    backgroundColor: theme.palette[type]
      ? theme.palette[type].dark
      : theme.palette.info.dark,
  }),
}));

Banner.proptype = {
  type: Proptypes.oneOf([...Banner.TYPE]),
  message: Proptypes.string,
  dismiss: Proptypes.func,
};

export default Banner;
