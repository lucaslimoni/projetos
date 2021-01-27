import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {},
  icon: {
    minWidth: 'auto',
  },
  label: {
    maxWidth: 150,
    marginLeft: theme.spacing(1),
    '& span': {
      fontSize: 13,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  info: {
    textAlign: 'right',
    marginLeft: 'auto',
    marginRight: 0,
    '& *': {
      verticalAlign: 'middle',
    },
  },
  infoLabel: {
    marginRight: theme.spacing(1),
    color: 'gray',
  },
  progress: {
    position: 'relative',
  },
  progressStatic: {
    color: '#ddd',
  },
  progressIndeterminate: {
    position: 'absolute',
    left: 0,
  },
}));
