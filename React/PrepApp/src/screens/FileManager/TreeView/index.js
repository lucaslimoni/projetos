import React, { useEffect } from 'react';
import useStyles from './styles';
import TreeViewItem from './TreeViewItem';
import ErrorTryAgain from '../ErrorTryAgain';
import TreeView from '@material-ui/lab/TreeView';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { splitPathComponents } from '~/helpers/utils';
import {
  treeRequest,
  contentRequest,
} from '~/store/modules/filemanager/actions';

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, isError, data } = useSelector(
    state => state.filemanager.tree
  );

  const currentPath = useSelector(state => state.filemanager.currentPath);
  const comps = splitPathComponents(currentPath);
  comps.shift();

  useEffect(() => {
    dispatch(treeRequest('/'));
  }, [dispatch]);

  function handleClick(event, data) {
    event.preventDefault();
    if (currentPath !== data.path) {
      dispatch(contentRequest(data.path));
    }
  }

  function handleTryAgain() {
    dispatch(treeRequest('/'));
  }

  function createTree(data, level = 1) {
    return data.map(item => {
      return (
        <TreeViewItem
          level={level}
          data={item}
          onClick={handleClick}
          key={item.path}
          nodeId={item.path}
          labelText={item.name}
          labelInfo={`${item.childrenCount}`}
        >
          {item.children.length > 0 && createTree(item.children, level + 1)}
        </TreeViewItem>
      );
    });
  }

  if (isError) {
    return (
      <div className={classes.wrapper}>
        <ErrorTryAgain onTryAgainAction={handleTryAgain} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.boxCenter}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <Typography variant="h6" className={classes.title}>
        Meus arquivos
      </Typography>
      <TreeView
        className={classes.root}
        defaultExpanded={['0']}
        selected={comps.map(el => el.path)}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {createTree(data)}
      </TreeView>
    </div>
  );
};
