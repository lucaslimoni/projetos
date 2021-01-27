import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    flex: 2,
    padding: '16px',
  },
  boxCenter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {},
  table: {
    marginTop: theme.spacing(2),
  },
  row: {
    cursor: 'pointer',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 2,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
