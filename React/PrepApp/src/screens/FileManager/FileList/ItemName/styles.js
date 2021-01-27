import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  img: {
    verticalAlign: 'middle',
    maxWidth: 24,
    maxHeight: 24,
  },
  cellLabelIcon: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: theme.spacing(1),
  },
}));
