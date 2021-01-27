import React, { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import FolderIcon from '@material-ui/icons/Folder';

import useStyles from './styles';

function createIcon(resource) {
  if (resource.type === 'IMAGE') {
    return <ImageIcon style={{ color: '#fad165' }} />;
  } else if (resource.type === 'VIDEO') {
    return <MovieIcon style={{ color: '#d93025' }} />;
  } else if (resource.type === 'AUDIO') {
    return <GraphicEqIcon style={{ color: '#1a73e8' }} />;
  }
  return <FolderIcon style={{ color: '#5f6368' }} />;
}

export default props => {
  const classes = useStyles();
  const { resource, labelId } = props;
  const [imgToShow, setImgToShow] = useState('ico');

  useEffect(() => {
    if (!resource.thumb) {
      return;
    }
    const imgLoad = new Image();
    imgLoad.onload = function() {
      setImgToShow('thumb');
    };
    imgLoad.onerror = function() {
      setImgToShow('error');
    };
    imgLoad.src = resource.thumb;
  });

  function getImage() {
    if (imgToShow === 'thumb') {
      return <img alt="Previa" className={classes.img} src={resource.thumb} />;
    }
    return createIcon(resource);
  }

  return (
    <TableCell component="th" id={labelId} scope="row">
      {getImage()}
      <Typography className={classes.cellLabelIcon}>{resource.name}</Typography>
    </TableCell>
  );
};
