import React, { useState, useEffect } from 'react';
import {
  FormControl,
  TextField,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { classes } from './styles';
import { toast } from 'react-toastify';
import _ from 'lodash';
export default function ContentPageNavigation(props) {
  const {
    pageIndex,
    selectedPage,
    pagesCount,
    showDelete,
    onChange,
    title,
    index,
    onDelete,
  } = props;

  const [error, setError] = useState(false);
  const [maxLength, setMaxLength] = useState(false);

  function onErr() {
    const isString = _.isString(title);
    if (error && !isString) {
      toast.error('Titulo é obrigatorio');
    }
  }

  useEffect(() => {
    if (selectedPage !== -1 && !title && pagesCount > 1) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedPage, title]);

  return (
    <div style={classes.root}>
      <div style={classes.divTextFieldPai}>
        <div style={{ width: '95%' }}>
          <TextField
            style={{ width: '95%' }}
            disabled={!showDelete}
            value={title || ''}
            error={error}
            onError={onErr()}
            helperText={maxLength ? 'Máximo 20 caracteres' : ''}
            onChange={event => {
              let T = event.target.value;
              if (T.length > 20) {
                event.target.value = T.slice(0, 20);
                setMaxLength(true);
              } else {
                setMaxLength(false);
              }
              onChange &&
                onChange({
                  index: index,
                  selectedPage: selectedPage,
                  title: event.target.value,
                });
            }}
          />
        </div>
        <div>
          {showDelete && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="medium"
              onClick={() => {
                onDelete(index);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        </div>
      </div>
      <div>
        <FormControl variant="outlined" style={classes.formControlSelect}>
          <Select
            labelId="selectNextOrPreviousPage"
            key={pagesCount}
            value={selectedPage}
            onChange={event => {
              onChange &&
                onChange({
                  index: index,
                  selectedPage: event.target.value,
                  title: title,
                });
            }}
            style={{ width: 250, height: 40 }}
          >
            <MenuItem value={-1}>
              <em>Nenhuma</em>
            </MenuItem>
            {Array(pagesCount)
              .fill()
              .map((el, index) => {
                if (index === pageIndex) {
                  return null;
                }
                return (
                  <MenuItem key={index} value={index}>
                    Pagina: {index + 1}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
