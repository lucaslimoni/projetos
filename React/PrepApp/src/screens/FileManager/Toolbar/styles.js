import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
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
