import React, { Component } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

/** passando de função para class */
export default class Repository extends Component {
  /** armazenando os dados do componente */
  state = {
    /** aqui é um único repositório então um objeto */
    repository: {},
    issues: [],
    loading: true,
  };

  /** fazendo chamadas a api */
  async componentDidMount() {
    /** pegando a match das propriedades */
    const { match } = this.props;

    /** passando o nome do repositório como parâmetro e o encode transforma o caractere especial em bara */
    const repoName = decodeURIComponent(match.params.repository);

    // vamos buscar dados de duas urls diferentes
    // https://api.github.com/repos/ower/repositoryName
    // https://api.github.com/repos/ower/repositoryName/issues

    // const response = await api.get(`/repos/${repoName}`); dados do repositório
    // const issues = await api.get(`/repos/${repoName}/issues`); dados das issues, mas, será que é necessário ou bom essa requisição ficar esperando pela primeira concluir

    /** como solução uma promise com todas as chamadas/requisições que eu quero aguardar e elas carregarão juntas */
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        /** passando query.params usando o axios */
        params: {
          /** issues que não foram resolvidos */
          state: 'open',
          /** mostra por página */
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
    return <h1>Repository</h1>;
  }
}
