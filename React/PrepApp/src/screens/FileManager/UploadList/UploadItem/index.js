import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import FolderIcon from '@material-ui/icons/Folder';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import ErrorIcon from '@material-ui/icons/Error';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LoopIcon from '@material-ui/icons/Loop';

import { getExt } from '~/helpers/utils';
import useStyles from './styles';
export default props => {
  const classes = useStyles();
  const { resource, showDivider } = props;

  function createIcon() {
    const ext = getExt(resource.name);

    if (['png', 'jpg', 'jpeg'].indexOf(ext) > -1) {
      return <ImageIcon style={{ color: '#fad165' }} />;
    } else if (ext === 'mp4') {
      return <MovieIcon style={{ color: '#d93025' }} />;
    } else if (ext === 'mp3') {
      return <GraphicEqIcon style={{ color: '#1a73e8' }} />;
    }
    return <FolderIcon style={{ color: '#5f6368' }} />;
  }

  function createProgress(progress) {
    return (
      <div className={classes.progress}>
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.progressStatic}
          size={22}
          thickness={4}
        />
        <CircularProgress
          variant="static"
          className={classes.progressIndeterminate}
          size={22}
          thickness={4}
          value={progress}
        />
      </div>
    );
  }

  function createCompStatus() {
    const { status, progress, error } = resource;
    if (status === 'UPLOADING') {
      return createProgress(progress);
    } else if (status === 'UPLOADED') {
      return <CheckCircleIcon style={{ color: '#00C851' }} />;
    } else if (status === 'ERROR') {
      let msg = error && error.message ? error.message : 'Erro no upload';
      if (error && error.validations && error.validations.length) {
        const item = error.validations[0];
        const message = item.message;
        const path = item.path === 'filename' ? 'Arquivo' : item.path;
        msg = `${path}: ${message}`;
      }
      return (
        <Tooltip title={msg} interactive>
          <div>
            <Typography className={classes.infoLabel} variant="caption">
              Erro no upload
            </Typography>
            <ErrorIcon style={{ color: '#ff4444' }} />
          </div>
        </Tooltip>
      );
    } else if (status === 'CANCELED') {
      return (
        <Tooltip title="A operação foi cancelada" interactive>
          <div>
            <Typography className={classes.infoLabel} variant="caption">
              Upload cancelado
            </Typography>
            <CancelIcon style={{ color: '#ff4444' }} />
          </div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip
          title="Aguardando autorização de envio do servidor."
          interactive
        >
          <div>
            <Typography className={classes.infoLabel} variant="caption">
              Aguardando envio
            </Typography>
            <LoopIcon style={{ color: '#4285F4' }} />
          </div>
        </Tooltip>
      );
    }
  }

  return (
    <div className={classes.root}>
      <ListItem button>
        <ListItemIcon className={classes.icon}>{createIcon()}</ListItemIcon>
        <Tooltip title={resource.name} interactive>
          <ListItemText className={classes.label} primary={resource.name} />
        </Tooltip>
        <div className={classes.info}>{createCompStatus()}</div>
      </ListItem>
      {showDivider && <Divider component="li" />}
    </div>
  );
};
