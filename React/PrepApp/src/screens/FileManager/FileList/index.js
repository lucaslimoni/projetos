import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import ErrorTryAgain from '../ErrorTryAgain';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';

import EmptyList from '../EmptyList';
import TableHeader from './Header';
import ItemName from './ItemName';
import useStyles from './styles';
import { contentRequest } from '~/store/modules/filemanager/actions';
import moment from 'moment';

const SortType = {
  name: sortByString,
  owner: sortByString,
  lastUpdate: sortByDate,
  size: sortByNumber,
};

function sortByString(field, order) {
  return (a, b) => {
    if (a[field] === null) return -1;
    if (b[field] === null) return 1;
    return order === 'asc'
      ? a[field].localeCompare(b[field])
      : b[field].localeCompare(a[field]);
  };
}

function sortByDate(field, order) {
  return (a, b) => {
    if (a[field] === null) return -1;
    if (b[field] === null) return 1;
    return order === 'asc'
      ? moment(a[field]).valueOf() - moment(b[field])
      : moment(b[field]).valueOf() - moment(a[field]);
  };
}

function sortByNumber(field, order) {
  return (a, b) => {
    if (a[field] === null) return -1;
    if (b[field] === null) return 1;
    return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
  };
}

function formatBytes(a, b = 1) {
  if (!a) return '-';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  );
}

function filter(data, orderBy, order, search) {
  const filtered = data.filter(i => {
    return !search || i.name.indexOf(search) > -1;
  });
  filtered.sort(SortType[orderBy](orderBy, order));
  return filtered;
}

export default props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { onSelected } = props;
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const content = useSelector(state => state.filemanager.content);
  const currentPath = useSelector(state => state.filemanager.currentPath);

  useEffect(() => {
    dispatch(contentRequest('/'));
  }, [dispatch]);

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  function handleSearchClear(event) {
    setSearchText('');
  }

  function handleRequestSort(event, property) {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  function handleSelectedItem(event, resource) {
    if (resource.type === 'DIRECTORY') {
      dispatch(contentRequest(resource.path));
    } else {
      onSelected(resource);
    }
  }

  function handleTryAgain() {
    dispatch(contentRequest(currentPath));
  }

  if (content.isError) {
    return (
      <div className={classes.wrapper}>
        <ErrorTryAgain onTryAgainAction={handleTryAgain} />
      </div>
    );
  }

  if (content.loading) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.boxCenter}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (!content.data || !content.data.length) {
    return <EmptyList />;
  }

  // Só processo os dados se existe
  let resources = filter(content.data, orderBy, order, searchText);

  return (
    <div className={classes.wrapper}>
      <Paper component="form" className={classes.paper}>
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Pesquisar por arquivos na pasta"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        {searchText.length > 0 && (
          <Divider className={classes.divider} orientation="vertical" />
        )}
        {searchText.length > 0 && (
          <IconButton
            type="submit"
            onClick={handleSearchClear}
            className={classes.iconButton}
            aria-label="clear"
          >
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tbFiles"
          size={'medium'}
          aria-label="table files"
        >
          <TableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={resources.length}
          />
          <TableBody>
            {resources.map((resource, index) => {
              const labelId = `row-table-${resource.path}`;
              return (
                <TableRow
                  hover
                  onDoubleClick={event => handleSelectedItem(event, resource)}
                  className={classes.row}
                  tabIndex={-1}
                  key={index}
                >
                  <ItemName labelId={labelId} resource={resource} />
                  <TableCell align="left">{resource.owner || '-'}</TableCell>
                  <TableCell align="left">
                    {moment(resource.lastUpdate).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="left">
                    {formatBytes(resource.size)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
