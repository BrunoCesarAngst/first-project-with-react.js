import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  /** altura total da tela */
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  /** para ficar um item abaixo do outro */
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    /** garantindo a borda aredondada */
    border-radius: 50%;
    /** espaço para o link de voltar a página */
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #656;
    /** aumentando 40% o espoço entre as linhas */
    line-height: 1.4;
    text-align: center;
    /** largura máxima do texto */
    max-width: 400px;
  }
`;
