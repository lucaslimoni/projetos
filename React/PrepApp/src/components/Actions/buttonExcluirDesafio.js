import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteChallenge,
  activateChallenge,
} from '~/store/modules/desafio/actions';

import history from 'services/history';
import { stateAll, clearChallengeRedux } from 'store/modules/desafio/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const dispatch = useDispatch();
  const { deleteChallengeSuccessMessage } = useSelector(state => state.desafio);
  const idChallenge = props.id;
  const statusChallenge = props.status;
  const { challenge } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deletar(idChallenge) {
    dispatch(deleteChallenge(idChallenge));
  }

  function editar() {
    dispatch(clearChallengeRedux());
    dispatch(stateAll(challenge, true));
    history.push({
      pathname: '/criarConteudo',
      challenge,
      action: 'edit',
      editou: false,
    });
  }

  useEffect(() => {
    if (deleteChallengeSuccessMessage) {
      handleClose();
    }
  }, [deleteChallengeSuccessMessage]);

  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ borderRadius: '5 5 0 0' }}>
        <Button
          variant="outlined"
          style={{ color: '#3796F6', borderColor: '#3796F6', marginRight: 3 }}
          onClick={editar}
        >
          EDITAR
        </Button>
        <Button
          variant="outlined"
          style={{ color: '#EB6460', borderColor: '#EB6460', marginLeft: 3 }}
          onClick={handleClickOpen}
        >
          EXCLUIR
        </Button>
        {statusChallenge === 'DRAFT' ? (
          <Button
            variant="outlined"
            style={{ color: '#00D31D', borderColor: '#00D31D', marginLeft: 3 }}
            onClick={() => {
              dispatch(activateChallenge(idChallenge));
            }}
          >
            PUBLICAR
          </Button>
        ) : (
          <Button disabled variant="outlined" style={{ marginLeft: 3 }}>
            PUBLICAR
          </Button>
        )}
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
              variant="outlined"
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
              variant="outlined"
              style={{
                color: '#FFFFFF',
                backgroundColor: '#3796F6',
                borderColor: '#3796F6',
                marginRight: 3,
              }}
              onClick={() => {
                deletar(idChallenge);
              }}
            >
              EXCLUIR
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
