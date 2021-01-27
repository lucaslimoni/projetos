import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    backgroundColor: '#323232',
    minWidth: 150,
    zIndex: 2001,
    left: 0,
    bottom: 0,
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(3),
    padding: theme.spacing(2),
  },
  title: {
    color: 'white',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: theme.spacing(2),
  },
  progress: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}));
