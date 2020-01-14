import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  color: #7159c1;
  /* acessando propriedades do componente por exemplo:
  <Title error || error={false}/>*/
  /* color: ${props => (props.error ? 'red' : '#7159c1')}; */
  font-family: Arial, Helvetica, sans-serif;

  /* exemplo de encadeamento de estilos com uma componente small dentro da
  componente Tile */
  small {
    font-size: 34px;
    color: #999;
  }
`;
