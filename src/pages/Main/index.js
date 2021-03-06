import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import {
  FaGithubAlt,
  FaPlus,
  FaExclamationCircle,
  FaSpinner,
} from 'react-icons/fa';

/** importando a baseURL da api */
import api from '../../services/api';

/** aqui o styled component que pode ser usado em vários arquivos */
import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

/** tornamos o componente funcional em component class state full */
export default class Main extends Component {
  state = {
    /** armazenando as repos que vem do value do input */
    newRepo: '',
    /** array que recebe o setState do state */
    repositories: [],
    /** efeito de carregando do botão enquanto o repositório está sendo adicionado */
    loading: false,
    error: null,
  };

  componentDidMount() {
    /** carregando os dados do localStorage */
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      /** se tem converte para json e preenche os repositories */
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  /** salvando os dados para o localStorage pegando o estado anterior prevState - antes dele ser atualizado */
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    /** se o estado de repositórios é diferente do meu estado atual de repositórios */
    if (prevState.repositories !== repositories) {
      /** transformando os dados em strings e armazenando */
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  /** recebendo o evento do onSubmit */
  handleSubmit = async e => {
    /** sem refresh */
    e.preventDefault();

    /** evento/efeito de carregando */
    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') {
        throw new Error('Digite um repositório');
      }

      const hasRepo = repositories.find(repo => repo.name === newRepo);

      if (hasRepo) {
        throw new Error('Esse repositório já foi incluído');
      }

      /** criamos o arquivo api.js na pasta services dentro de src que utiliza axios e aqui fazemos a chamada a api com o método get que trás informações */
      const response = await api.get(`/repos/${newRepo}`);

      /** armazenamos uma informação relevante */
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        /** criando um novo repositories copiando tudo de dentro dela e acrescentando o último dado conceito de imutabilidade */
        repositories: [...repositories, data],
        /** limpando o input */
        newRepo: '',
        /** termina o efeito de carregando */
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    /** trazendo as propriedades do state */
    const { newRepo, repositories, loading, error } = this.state;

    return (
      /* para fazer alinhamentos */
      <Container>
        <h1>
          {/** ícone do github */}
          Acessando as issues <FaExclamationCircle /> de um repositório
          <FaGithubAlt />
        </h1>

        {/** quando um componente tem mais de dois níveis de encadeamento de estilo criamos um novo componente estilizado */}
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            /** atribui o valor para newRepo e recebendo alterações */
            value={newRepo}
            /** envia o valor para a função que faz setState */
            onChange={this.handleInputChange}
          />

          {/* enquanto a requisição não for atendida o botão recebe o o feito de carregando que está recebendo a configuração do efeito lá no styles.js */}
          <SubmitButton loading={loading}>
            {/* se loading true animação de carregamento senão botão de + */}
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              /* ícone de + e edito seu estilo do padrão */
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        {/* List é uma ul que retorna para cada li um repositório fornecido */}
        <List>
          {/* retorno entre parenteses pois retorna mais de uma li */}
          {repositories.map(repository => (
            /** passando no key a propriedade única de repository */
            <li key={repository.name}>
              <span>{repository.name}</span>
              {/* rota para repository passando o nome do repositório como parâmetro e o encode transforma a bara em caractere especial e em routes.js aviso que será passado um parâmero  */}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
