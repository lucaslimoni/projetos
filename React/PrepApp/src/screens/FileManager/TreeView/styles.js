import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    minWidth: 200,
    maxWidth: 300,
    padding: theme.spacing(2),
    paddingLeft: 0,
    borderRight: '1px solid #DDD',
    overflowX: 'auto',
  },
  boxCenter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  title: {
    color: '#3f51b5',
    paddingLeft: theme.spacing(2),
  },
}));
