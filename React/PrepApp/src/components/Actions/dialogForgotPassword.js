import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ borderRadius: '5 5 0 0' }}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            padding: 0,
            background: '#3796F6 no-repeat padding-box',
            borderRadius: '5 5 0 0',
            opacity: 1,
          }}
        >
          <Alert
            variant="filled"
            severity="info"
            icon={false}
            style={{ paddingLeft: 20, fontSize: 18 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Atenção
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ fontSize: 14 }}
          >
            Tem certeza de que deseja excluir? O Desafio será apagado
            permanentemente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="filled"
            style={{
              color: '#3796F6',
              backgroundColor: '#EBEEF0',
              borderColor: '#EBEEF0',
              marginRight: 3,
            }}
            onClick={handleClose}
          >
            CANCELAR
          </Button>
          <Button
            variant="filled"
            style={{
              color: '#FFFFFF',
              backgroundColor: '#3796F6',
              borderColor: '#3796F6',
              marginRight: 3,
            }}
            onClick={handleClose}
          >
            EXCLUIR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
