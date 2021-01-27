import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AddIcon from '@material-ui/icons/Add';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import { useDispatch, useSelector } from 'react-redux';
import { contentRequest } from '~/store/modules/filemanager/actions';
import { splitPathComponents } from '~/helpers/utils';
import useStyles from './styles';

export default props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onActionClose, onActionCreateDirectory, onActionUpload } = props;
  const path = useSelector(state => state.filemanager.currentPath);
  const { isLoaded } = useSelector(state => state.filemanager.tree);
  const comps = splitPathComponents(path);

  comps[0].name = 'Meus arquivos';

  function handleClick(e, comp) {
    dispatch(contentRequest(comp.path));
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onActionClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
          {comps.map(comp => {
            if (comp.isLast) {
              return (
                <Typography key={comp.path} className={classes.lastBreadComp}>
                  {comp.name}
                </Typography>
              );
            }
            return (
              <Link
                onClick={e => handleClick(e, comp)}
                key={comp.path}
                className={classes.link}
              >
                {comp.name}
              </Link>
            );
          })}
        </Breadcrumbs>

        {isLoaded > 0 && (
          <IconButton
            color="inherit"
            onClick={onActionCreateDirectory}
            aria-label="createNewFolder"
          >
            <CreateNewFolderIcon />
          </IconButton>
        )}
        {isLoaded > 0 && (
          <IconButton color="inherit" onClick={onActionUpload} aria-label="add">
            <AddIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};
