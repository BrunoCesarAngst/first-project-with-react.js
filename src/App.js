import React from 'react';

import Routes from './routes';

/** importando o componente de estilo global */
import GlobalStyle from './styles/global';

function App() {
  return (
    /** aplicando fragments para encapsular componentes sem afetar a DOM */
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
