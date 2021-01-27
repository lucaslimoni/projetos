import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import ContentBody from '../../../components/ContentBody';
import { classes, Title, useStyles } from './styles';

import { Button, TextareaAutosize } from '@material-ui/core';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getMessage } from '~/store/modules/desafio/actions';
import history from 'services/history';
import { toast } from 'react-toastify';
import { clearChallengeRedux } from 'store/modules/desafio/actions';

export default function CriarConteudo(props) {
  const dispatch = useDispatch();
  const { createMessageSuccess, createGetMessageSuccess } = useSelector(
    state => state.desafio
  );
  const [btnLabel] = useState('Salvar');
  const [contCharacter, setContCharacter] = useState(0);
  const [message, setMessage] = useState('');
  const MuiTabs = useStyles();

  function handleChange(event) {
    const cont = event.length;
    setContCharacter(cont);
    setMessage(event);
  }

  useEffect(() => {
    dispatch(getMessage());
    if (createGetMessageSuccess) {
      setMessage(createGetMessageSuccess);
    }
  }, [createGetMessageSuccess]);

  useEffect(() => {
    if (createMessageSuccess) {
      toast.success('Aviso cadastrado com sucesso');
      history.push('/desafios');
      dispatch(clearChallengeRedux());
    }
  }, [createMessageSuccess]);

  return (
    <div>
      <ContentBody title="AVISO">
        <Paper square className={MuiTabs.root}>
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Roboto',
                fontSize: 20,
                color: '#78909C',
                textAlign: 'left',
                padding: 20,
                letterSpacing: 0,
              }}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                Criar novo aviso
              </p>
              <p>
                Crie uma mensagem de aviso que aparecerá na tela de desafio
                quando não houver desafios ativos. Se possível, deixe claro na
                mensagem <b>quando</b> será lançado o próximo desafio, para que
                os usuários possam se manter informados.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                padding: '20px 20px 2px 20px',
              }}
            >
              <TextareaAutosize
                rowsMax={4}
                maxLength={150}
                value={message}
                style={{ width: '100%', height: 100, padding: 10 }}
                onChange={event => {
                  handleChange(event.target.value);
                }}
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 14,
                  color: '#78909C',
                  textAlign: 'right',
                  paddingRight: 22,
                  letterSpacing: 0,
                }}
              >
                {contCharacter}/150
              </p>
            </div>
          </div>
          <div style={classes.containerDivButtoms}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3796F6',
                color: '#FFFFFF',
              }}
              type="submit"
              onClick={() => {
                dispatch(createMessage(message));
              }}
            >
              {btnLabel}
            </Button>
          </div>
        </Paper>
      </ContentBody>
    </div>
  );
}
