import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* removendo de todos os elementos as configurações padrão */
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    /* sempre soma a margin o padding e outros espaçamentos com a largura dos elementos ex.: elemento de 280px de largura fixa e for adicionado 10px de padding o conteúdo é exprimido para 270px, evitando quebra de layout*/
    box-sizing: border-box;
  }

  html, body, #root {
    /* ocupando toda a altura da página */
    min-height: 100%;
  }

  body {
    background: #7259c1;
    /* deixa as fontes bem definidas(contornadas) */
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
