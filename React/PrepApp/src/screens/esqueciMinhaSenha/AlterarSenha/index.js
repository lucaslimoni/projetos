import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import { resetPassword } from '~/store/modules/auth/actions';

import { senha, error, fieldPassword, btnSalvar, success } from './styles';

const schema = Yup.object().shape({
  password: Yup.string().required('A senha é obrigatória'),
});

function confirm(password, confirmPassword) {
  if (password === confirmPassword) {
    return true;
  }
  return false;
}

export default function AlterarSenha(props) {
  const tokenURL = props.location.search;
  const [token, setToken] = useState(0);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    if (tokenURL) {
      let tk = tokenURL.split('?token=');
      setToken(tk[1]);
    }
  }, [token, tokenURL]);

  const messageComponent = (
    <label style={errorMessage ? error : success}>
      {errorMessage ? errorMessage : successMessage}
    </label>
  );
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schema}
      onSubmit={values => {
        if (values.password.length < 6) {
          setErrorMessage('Minimo 6 caracteres');
        } else {
          const ok = confirm(values.password, values.confirmPassword);
          if (!ok) {
            setErrorMessage('A senha digitada é diferente');
          } else {
            setErrorMessage('');
            setSuccessMessage('Senha alterada com sucesso');
            dispatch(resetPassword(token, values.password));
          }
        }
      }}
    >
      {() => (
        <Form>
          <Grid container>
            <label style={senha}>Senha</label>
            <Grid container direction="column" justify="center">
              <Field style={fieldPassword} name="password" />
            </Grid>
          </Grid>
          <Grid container>
            <label style={senha}>Confirme a Senha</label>
            <Grid container direction="column" justify="center">
              <Field
                style={fieldPassword}
                name="confirmPassword"
                type="confirmPassword"
              />
            </Grid>
            {messageComponent}
          </Grid>

          <Grid container>
            <Grid container direction="column" justify="center">
              <button type="submit" style={btnSalvar}>
                {'Salvar'}
              </button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
