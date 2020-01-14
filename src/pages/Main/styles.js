import styled from 'styled-components';

export const Title = styled.h1`
  /* acessando propriedades do componente por exemplo:
  <Title error || error={false}/>
  color: ${props => (props.error ? 'red' : '#7159c1')};
  exemplo de encadeamento de estilos com uma componente small dentro da
  componente Tile
  small {
    font-size: 34px;
    color: #999;
  } */

  color: #fff
`;
