import React from 'react';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';

import useStyles from './styles';

export default props => {
  const classes = useStyles();
  const { onTryAgainAction } = props;

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.button}
        onClick={onTryAgainAction}
        color="primary"
        startIcon={<ReplayIcon />}
      >
        Recarregar
      </Button>
    </div>
  );
};
