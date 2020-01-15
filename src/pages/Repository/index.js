import React from 'react';

// import { Container } from './styles';

export default function Repository({ match }) {
  /** passando o nome do repositório como parâmetro e o encode transforma o caractere especial em bara */
  return <h1>Repository: {decodeURIComponent(match.params.repository)}</h1>;
}
