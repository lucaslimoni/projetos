import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    flexDirection: 'column',
    display: 'flex',
    backgroundColor: 'white',
    width: 350,
    maxHeight: 600,
    zIndex: 2000,
    right: 0,
    bottom: 0,
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  appBar: {
    position: 'relative',
  },
  toolBar: {
    minHeight: 44,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(0.5),
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  uploadInfo: {
    backgroundColor: '#eee',
    '& span': {
      fontSize: 13,
    },
  },
  cancelUploadButton: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  contentView: {},
  contentList: {
    padding: 0,
  },
  closeIcon: {
    fontSize: 20,
  },
}));
