import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  content: props => ({
    paddingLeft: theme.spacing(2 * props.level),
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
  group: {
    marginLeft: 0,
  },
  expanded: {},
  selected: {},
  label: {
    backgroundColor: 'transparent !important',
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
    color: '#5f6368',
  },
  labelText: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
    flexGrow: 1,
  },
  labelInfo: {
    marginLeft: theme.spacing(1),
  },
}));
