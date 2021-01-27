import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import { signInRequest } from '~/store/modules/auth/actions';
import { Link } from 'react-router-dom';

import {
  login,
  senha,
  error,
  esqueciASenha,
  btnEntrar,
  fieldPassword,
  fieldLogin,
} from './styles';

const schema = Yup.object().shape({
  username: Yup.string().required('O usuário é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading, errorMessage } = useSelector(state => state.auth);
  const messageComponent = <label style={error}>{errorMessage}</label>;

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(signInRequest(values.username, values.password));
      }}
    >
      {() => (
        <Form>
          <Grid container>
            <label style={login}>Login</label>
            <Grid container direction="column" justify="center">
              <Field style={fieldLogin} name="username" />
            </Grid>
          </Grid>
          <Grid container>
            <label style={senha}>Senha</label>
            <Grid container direction="column" justify="center">
              <Field style={fieldPassword} name="password" type="password" />
            </Grid>
            {messageComponent}
          </Grid>

          <Grid container>
            <div style={{ width: '100%' }}>
              <Link to="/esqueciMinhaSenha">
                <div style={esqueciASenha}>Esqueci a senha</div>
              </Link>
            </div>
            <Grid container direction="column" justify="center">
              <button type="submit" style={btnEntrar}>
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
