import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
  },
  scrollWrapper: {
    minWidth: 800,
    overflowX: 'auto',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    backgroundColor: 'white',
    flex: 2,
  },
  appBar: { position: 'relative', flex: 0 },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  breadcrumbs: {
    color: 'white',
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  link: {
    color: 'white',
    cursor: 'pointer',
  },
  lastBreadComp: {
    color: 'white',
  },
}));
