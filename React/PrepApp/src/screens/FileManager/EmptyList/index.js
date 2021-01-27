import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Error from '../Error';
import { getExt } from '~/helpers/utils';
import { useDispatch } from 'react-redux';

import { uploadResourceRequest } from '~/store/modules/filemanager/actions';
import useStyles from './styles';

export default props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isDragging, setIsDragging] = useState(false);
  const [isError, setIsError] = useState(false);

  function handlerOnDrop(e) {
    handleDragEnd(e);
    const files = e.dataTransfer.files;
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
        setIsError(true);
        return;
      }
    }
    [...files].forEach(file => {
      dispatch(uploadResourceRequest(file));
    });
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragStart(e) {
    preventDefault(e);
    setIsDragging(true);
  }

  function handleDragEnd(e) {
    preventDefault(e);
    setIsDragging(false);
  }

  function handleSnackClose(e) {
    setIsError(false);
  }

  return (
    <div
      onDrop={handlerOnDrop}
      onDragEnter={handleDragStart}
      onDragLeave={handleDragEnd}
      onDragStart={preventDefault}
      onDragEnd={preventDefault}
      onDragOver={preventDefault}
      onDrag={preventDefault}
      className={classes.wrapper}
    >
      <Avatar
        className={classes.info + (isDragging ? ` ${classes.isDragging}` : '')}
      >
        <div className={classes.content}>
          <InsertDriveFileIcon className={classes.icon} />
          <Typography className={classes.title} variant="h6">
            Arraste seu arquivo aqui
          </Typography>
          <Typography className={classes.subtitle} variant="body2">
            Ou use o botão "Adicionar"
          </Typography>
        </div>
      </Avatar>
      <Error open={isError} onClose={handleSnackClose}>
        Os formatos de arquivo permitido são JPG, JPEG, PNG, MP3 e MP4..
      </Error>
    </div>
  );
};
