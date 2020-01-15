import styled, { keyframes, css } from 'styled-components';

// export const Title = styled.h1`
//   acessando propriedades do componente por exemplo:
//   <Title error || error={false}/>
//   color: ${props => (props.error ? 'red' : '#7159c1')};
//   exemplo de encadeamento de estilos com uma componente small dentro da
//   componente Tile
//   small {
//     font-size: 34px;
//     color: #999;
//   }

//   color: #fff
// `;

/** aqui passamos a usar o src/components/Container/index.js  */
// export const Container = styled.div`
//   max-width: 700px;
//   /* 80px em cima e embaixo e auto nas laterais, assim se a tela passar de 700px o container permanece com 700px */
//   margin: 80px auto;
//   background: #fff;
//   border-radius: 4px;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//   padding: 30px;

//   h1 {
//     font-size: 20px;
//     /* centralizando o ícone e o texto na horizontal */
//     display: flex;
//     flex-direction: row;
//     align-items: center;

//     svg {
//       margin-right: 10px;
//     }
//   }
// `;

export const Form = styled.form`
  margin-top: 30px;
  /* assim garantimos input e o botão sempre fiquem um do lado do outro */
  display: flex;
  flex-direction: row;

  input {
    /* o input ocupa todo espaço possível */
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

/** criando a animação de carregando */
const rotate = keyframes`
  /* de */
  from {
    transform: rotate(0deg);
  }
  /* para */
  to {
    transform: rotate(360deg);
  }
`;

/* passando pelo style components o atributo do componente e com props conseguimos acessar as propriedades do elemento colocando o objeto {} entre parenteses ({}) para retornar */
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  /** setamos a propriedade disabled como props.loading dando equivalência se props.loading estiver true também estará o disabled */
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  /* o conteúdo do botão "+", sempre estará centralizado */
  display: flex;
  justify-content: center;
  align-items: center;

  /* & estou me referindo ao elemento botão */
  &[disabled] {
    /* sinal de não permitido */
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* uma função pegando minhas propriedades, se props.loading = true aplica a animação */
  ${props =>
    props.loading &&
    /** adicionar um conjunto de css a um elemento baseado em alguma propriedade ou informação que vem de fora dele */
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  /* tirar a bolinha */
  list-style: none;
  /* espaçamento entre */
  margin-top: 30px;

  li {
    /* top/ bottom, right/left */
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    /* separando para o limites da direita e esquerda */
    justify-content: space-between;
    align-items: center;

    /* elemento atual mais li, se tem um li antes acrescenta a linha */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      /* tirar o underline */
      text-decoration: none;
    }
  }
`;
