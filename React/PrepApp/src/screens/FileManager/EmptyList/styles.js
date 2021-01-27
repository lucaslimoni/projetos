import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    flex: 2,
    padding: '16px',
    position: 'relative',
  },
  info: {
    width: 400,
    height: 400,
    backgroundColor: '#f5f5f5',
    position: 'relative',
    left: 'calc(50% - 200px)',
    top: 'calc(50% - 200px)',
    pointerEvents: 'none',
  },
  isDragging: {
    border: '5px solid rgba(180, 180, 180, 0.3)',
  },
  content: { textAlign: 'center' },
  icon: {
    color: '#dfe0e0',
    fontSize: 150,
  },
  title: {
    display: 'block',
    textAlign: 'center',
    color: '#cccccc',
  },
  subtitle: {
    display: 'block',
    textAlign: 'center',
    color: '#cccccc',
  },
}));
