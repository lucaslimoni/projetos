import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { createDirectoryRequest } from '~/store/modules/filemanager/actions';

export default props => {
  const { open, onClose } = props;
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    setName('');
  };

  const handleCreate = () => {
    dispatch(createDirectoryRequest(name));
    onClose();
    setName('');
  };

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleEnterCheck(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleCreate();
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Criar diretório</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o nome que deseja para o novo diretório. Por favor, evite
            acentos e espaços.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={name}
            onKeyPress={handleEnterCheck}
            onChange={handleChange}
            label="Diretório"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreate} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
