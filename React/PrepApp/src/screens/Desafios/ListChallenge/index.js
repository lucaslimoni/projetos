import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';
import AlertDialogSlide from 'components/Actions/buttonExcluirDesafio';
import * as moment from 'moment';
import { getInt } from '~/helpers/preferences';

function createButton(props) {
  return <AlertDialogSlide {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'TÍTULO',
  },
  { id: 'week', numeric: true, disablePadding: false, label: 'SEMANA' },
  {
    id: 'dt_cad',
    numeric: true,
    disablePadding: false,
    label: 'CADASTRADO EM',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'AÇÕES',
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="MuiTable-root">
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <div className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </div>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function ListChallenge(props) {
  const classes = useStyles();
  const { result, onChangePage, onChangeRowsPerPage } = props;

  const page = result && result.page ? result.page - 1 : 0;
  const totalDocs = result && result.totalDocs ? result.totalDocs : 0;
  const rowsPerPage =
    result && result.limit ? result.limit : getInt('page-limit', 20);
  const list = result && Array.isArray(result.docs) ? result.docs : [];

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const rows = [];

  list.forEach(data => {
    rows.push({
      name: data.title,
      week: moment(data.createdAt).isoWeek(),
      dt_cad: moment(data.createdAt).format('DD/MM/YYYY'),
      actions: createButton({
        ...props,
        id: data.id,
        status: data.status,
        challenge: data,
      }),
      id: data.id,
    });
  });

  const handleChangeRowsPerPage = (event, property) => {
    event.preventDefault();
    onChangeRowsPerPage(property.props.value);
    return false;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, page) => {
    event.preventDefault();
    onChangePage(page + 1);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              padding="default"
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="default"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.week}</TableCell>
                      <TableCell align="center">{row.dt_cad}</TableCell>
                      <TableCell align="center">{row.actions}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          labelRowsPerPage={'Linhas por página'}
          component="div"
          count={totalDocs}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
