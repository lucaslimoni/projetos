import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert';

export default props => {
  const { open, children, onClose } = props;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert severity="error" onClose={onClose}>
        {children}
      </Alert>
    </Snackbar>
  );
};
