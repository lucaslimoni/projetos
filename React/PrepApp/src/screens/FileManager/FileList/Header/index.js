import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const headCells = [
  { id: 'name', label: 'Nome' },
  { id: 'owner', label: 'Criado por' },
  { id: 'lastUpdate', label: 'Última modificação' },
  { id: 'size', label: 'Tamanho' },
];

export default props => {
  const { order, orderBy, onRequestSort } = props;
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={event => onRequestSort(event, headCell.id)}
            >
              <Typography variant="subtitle1" className={classes.label}>
                {headCell.label}
              </Typography>
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
};
