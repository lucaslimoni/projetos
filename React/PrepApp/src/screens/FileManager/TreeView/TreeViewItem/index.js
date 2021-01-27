import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import useStyles from './styles';

function StyledTreeItem(props) {
  const { labelText, labelInfo, level, data, onClick, ...other } = props;
  const classes = useStyles(props);

  return (
    <TreeItem
      onLabelClick={event => onClick(event, data)}
      label={
        <div className={classes.labelRoot}>
          <FolderIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography
            variant="caption"
            className={classes.labelInfo}
            color="inherit"
          >
            {labelInfo}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default StyledTreeItem;
