import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  /* 80px em cima e embaixo e auto nas laterais, assim se a tela passar de 700px o container permanece com 700px */
  margin: 80px auto;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;

  h1 {
    font-size: 20px;
    /* centralizando o ícone e o texto na horizontal */
    display: flex;
    flex: 1;
    align-items: center;
    text-align: center;
    flex-direction: row;

    svg {
      margin: 0 10px;
    }
  }
`;

export default Container;
