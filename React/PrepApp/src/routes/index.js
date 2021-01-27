import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './RouteWrapper';

import LogIn from '../screens/LogIn';
import Dashboard from '../screens/Dashboard';
import esqueciMinhaSenha from '../screens/esqueciMinhaSenha';
import AlterarSenha from '../screens/esqueciMinhaSenha/AlterarSenha';
import Desafios from '../screens/Desafios';
import CriarConteudo from '../screens/Desafios/Criar';
import CriarAviso from '../screens/Desafios/CriarAviso';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LogIn} needsAuth={false} />
      <Route
        path="/esqueciMinhaSenha/alterarSenha"
        exact
        component={AlterarSenha}
        needsAuth={false}
      />
      <Route
        path="/esqueciMinhaSenha"
        exact
        component={esqueciMinhaSenha}
        needsAuth={false}
      />
      <Route path="/dashboard" exact component={Dashboard} needsAuth={true} />
      <Route path="/desafios" exact component={Desafios} needsAuth={true} />
      <Route
        path="/criarConteudo"
        exact
        component={CriarConteudo}
        needsAuth={true}
      />
      <Route path="/criarAviso" exact component={CriarAviso} needsAuth={true} />
      <Route path="*" exact component={() => <h1>404</h1>} needsAuth={false} />
    </Switch>
  );
}
