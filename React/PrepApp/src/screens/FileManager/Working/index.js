import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

import useStyles from './styles';

export default props => {
  const classes = useStyles();
  const newDirectory = useSelector(state => state.filemanager.newDirectory);
  const style =
    newDirectory.count > 0
      ? { visibility: 'visible' }
      : { visibility: 'hidden' };

  return (
    <Paper elevation={3} style={style} className={classes.wrapper}>
      <CircularProgress size={20} className={classes.progress} />
      <Typography variant="body1" className={classes.title}>
        Trabalhando...
      </Typography>
    </Paper>
  );
};
