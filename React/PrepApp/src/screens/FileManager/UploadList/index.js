import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';

import UploadItem from './UploadItem';
import useStyles from './styles';
import {
  uploadResourceCancelRequest,
  uploadResourceClear,
} from '~/store/modules/filemanager/actions';

export default props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [isAlertCloseOpen, setIsAlertCloseOpen] = useState(false);

  const resources = useSelector(state => state.filemanager.uploadList);

  function handleDialogClose() {
    let showAlert = false;
    for (let i = 0; i < resources.length; i++) {
      if (
        resources[i].status === 'WAITING' ||
        resources[i].status === 'UPLOADING'
      ) {
        showAlert = true;
        break;
      }
    }
    if (showAlert) {
      setIsAlertCloseOpen(true);
    } else {
      dispatch(uploadResourceClear());
    }
  }

  function handleToggleContent() {
    setIsContentOpen(!isContentOpen);
  }

  function handleUploadCancel() {
    dispatch(uploadResourceCancelRequest());
  }

  function handleCancelAndClose() {
    setIsAlertCloseOpen(false);
    dispatch(uploadResourceCancelRequest());
    dispatch(uploadResourceClear());
  }

  function handleCancel() {
    setIsAlertCloseOpen(false);
  }

  const resourcesCount = resources.length;

  const dialogStyle =
    resourcesCount > 0 ? { visibility: 'visible' } : { visibility: 'hidden' };
  const contentStyle = isContentOpen
    ? { display: 'block' }
    : { display: 'none' };

  let isUploading = false;
  let el;
  for (let i = 0; i < resources.length; i++) {
    el = resources[i];
    if (el.status === 'UPLOADING' || el.status === 'WAITING') {
      isUploading = true;
      break;
    }
  }

  return (
    <Paper elevation={3} style={dialogStyle} className={classes.wrapper}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.lastBreadComp}>Enviando</Typography>
          <div className={classes.toolbarButtons}>
            <IconButton
              color="inherit"
              onClick={handleToggleContent}
              aria-label="content"
            >
              {isContentOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div style={contentStyle} className={classes.contentView}>
        <List
          component="nav"
          aria-label="resources"
          className={classes.contentList}
        >
          {isUploading && (
            <ListItem className={classes.uploadInfo} button>
              <ListItemText
                className={classes.labelUploadBeginning}
                primary="Iniciando upload"
              />
              <Button
                className={classes.cancelUploadButton}
                onClick={handleUploadCancel}
                color="primary"
              >
                Cancelar
              </Button>
            </ListItem>
          )}
          <Divider component="li" />
          {resources.map((resource, index) => {
            return (
              <UploadItem
                key={index}
                resource={resource}
                showDivider={index + 1 !== resourcesCount}
              />
            );
          })}
        </List>
      </div>
      <Dialog
        open={isAlertCloseOpen}
        keepMounted
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Deseja cancelar os uploads ativos?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ao fechar a janela de uploads, você irá cancelar os itens ativos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCancelAndClose} color="primary">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
