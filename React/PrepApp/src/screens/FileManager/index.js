import React, { useState, useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { getExt } from '~/helpers/utils';

import Error from './Error';
import TreeView from './TreeView';
import FileList from './FileList';
import AddDirectoryDialog from './AddDirectoryDialog';
import UploadList from './UploadList';
import Toolbar from './Toolbar';
import Working from './Working';
import useStyles from './styles';
import {
  uploadResourceRequest,
  clearError,
} from '~/store/modules/filemanager/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [externalParams, setExternalParams] = useState({});
  const [open, setOpen] = useState(false);
  const [isCreateDirectory, setIsCreateDirectory] = useState(false);
  const [isFileError, setIsFileError] = useState(false);
  const [isBackground, setIsBackground] = useState(false);

  const { manager } = props;
  const error = useSelector(state => state.filemanager.error);

  const fileRef = useRef(null);

  manager.show = ep => {
    setExternalParams(ep);
    handleShow();
  };

  manager.close = () => {
    handleClose();
  };

  manager.error = er => {
    setIsFileError(true);
    setIsBackground(true);
  };

  function handleChooseFiles() {
    fileRef.current.click();
  }

  function handleClose() {
    setOpen(false);
    manager.onClose();
  }

  function handleCreateDirectoryShow() {
    setIsCreateDirectory(true);
  }

  function handleCreateDirectoryClose() {
    setIsCreateDirectory(false);
  }

  function handleShow() {
    setOpen(true);
  }

  function handleSnackClose(e) {
    setIsFileError(false);
    dispatch(clearError());
  }

  function handleUpload(files) {
    if (isBackground) {
      setIsFileError(true);
      return;
    }
    let file;
    for (let i = 0; i < files.length; i++) {
      file = files[i];
      const ext = getExt(file.name).toLowerCase();
      if (
        ext !== 'png' &&
        ext !== 'jpeg' &&
        ext !== 'jpg' &&
        ext !== 'mp4' &&
        ext !== 'mp3'
      ) {
        setIsFileError(true);
        return;
      }
    }
    [...files].forEach(file => {
      dispatch(uploadResourceRequest(file));
    });
  }

  function handleSelected(item) {
    manager.onSelected(item, externalParams);
  }

  const isError = isFileError || error;
  const errorMessage = isError
    ? isFileError
      ? isBackground
        ? 'Os formatos de arquivo permitido são JPG, JPEG, PNG'
        : 'Os formatos de arquivo permitido são JPG, JPEG, PNG, MP3 e MP4..'
      : error.message
    : '';

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      className={classes.dialog}
      TransitionComponent={Transition}
    >
      <div className={classes.scrollWrapper}>
        <Toolbar
          onActionClose={handleClose}
          onActionCreateDirectory={handleCreateDirectoryShow}
          onActionUpload={handleChooseFiles}
        />
        <div className={classes.wrapper}>
          <TreeView />
          <FileList onSelected={handleSelected} />
          <AddDirectoryDialog
            onClose={handleCreateDirectoryClose}
            open={isCreateDirectory}
          />
          <input
            type="file"
            id="file"
            multiple
            onChange={e => handleUpload(e.target.files)}
            ref={fileRef}
            style={{ display: 'none' }}
          />
          <UploadList />
          <Working />
        </div>
      </div>
      <Error open={isError} onClose={handleSnackClose}>
        {errorMessage}
      </Error>
    </Dialog>
  );
};
