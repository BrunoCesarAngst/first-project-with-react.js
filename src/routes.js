import React from 'react';
/**
 * BrowserRouter é a configuração das rotas com uma barra "/"
 * O Switch garante que só uma rota/página seja escolhida
 */
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/** Importando os componentes */
import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/**
         * cada route representa uma página da nossa aplicação
         * exact garante que se usuário estiver na url .../, irá chamar a página
         * Main
         */}
        <Route path="/" exact component={Main} />
        {/* passando um parâmetro /: e lá no index.js dessa página passo essa informação */}
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
