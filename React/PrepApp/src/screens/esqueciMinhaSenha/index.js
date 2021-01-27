import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form } from 'formik';
import { signInForgotPassword } from '~/store/modules/auth/actions';
import history from 'services/history';

import {
  Wrapper,
  Content,
  redefinicaoSenha,
  conteudo,
  divRedefinicaoSenha,
  divConteudo,
  labelEmail,
  fieldEmail,
  btnEnviar,
  error,
} from './styles';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = Yup.object().shape({
  email: Yup.string().required('O email é obrigatório!'),
});

export default function EsqueciMinhaSenha() {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const { loading, forgotPasswordMessage } = useSelector(state => state.auth);
  // const { loading, errorMessage } = '';
  const messageComponent = <label style={error}>{forgotPasswordMessage}</label>;

  const handleClick = () => {
    setHidden(false);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          marginTop: 30,
          marginLeft: 10,
          fontSize: 30,
        }}
      >
        <IconButton
          aria-label="Voltar"
          size="large"
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </div>
      <Wrapper>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={schema}
          onSubmit={values => {
            dispatch(signInForgotPassword(values.email));
          }}
        >
          {() => (
            <Content>
              <Grid container>
                <Grid container justify="center" alignItems="center">
                  <div style={divRedefinicaoSenha}>
                    <div style={redefinicaoSenha}>Redefinição de senha</div>
                  </div>
                  <div style={divConteudo}>
                    <div style={conteudo}>
                      <div>Insira seu e-mail de cadastro.</div>
                      <div>
                        Será enviado um link para você redefinir sua senha.
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Form>
                <div style={{ display: 'flex' }}>
                  <Grid container id="grid">
                    <label style={labelEmail}>Email</label>
                    <Grid container justify="center">
                      <Field style={fieldEmail} name="email" />
                    </Grid>
                    {messageComponent}
                    {hidden ? (
                      <button
                        type="submit"
                        style={btnEnviar}
                        onClick={() => {
                          setTimeout(() => {
                            handleClick();
                          }, 100);
                        }}
                      >
                        {loading ? 'Enviado...' : 'Enviar'}
                      </button>
                    ) : (
                      <button
                        style={btnEnviar}
                        onClick={() => {
                          history.push('/');
                        }}
                      >
                        {'Voltar'}
                      </button>
                    )}
                  </Grid>
                </div>
              </Form>
            </Content>
          )}
        </Formik>
      </Wrapper>
    </>
  );
}
