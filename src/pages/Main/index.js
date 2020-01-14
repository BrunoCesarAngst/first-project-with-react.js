import React from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

function Main() {
  return (
    /* para fazer alinhamentos */
    <Container>
      <h1>
        {/** ícone do github */}
        <FaGithubAlt />
        Repositórios
      </h1>

      {/** quando um componente tem mais de dois níveis de encadeamento de estilo criamos um novo componente estilizado */}
      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar Repositório" />

        {/* enquanto a requisição não for atendida o botão some */}
        <SubmitButton disabled>
          {/* ícone de + e edito seu estilo do padrão */}
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Main;
