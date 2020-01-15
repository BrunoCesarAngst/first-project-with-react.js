import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

/** aqui o styled component que pode ser usado em vários arquivos */
import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

/** passando de função para class */
export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  /** armazenando os dados do componente */
  state = {
    /** aqui é um único repositório então é um objeto */
    repository: {},
    issues: [],
    /** para controlar o estado de carregado ou não */
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
      /** quer dizer que já carregou */
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    /** enquanto não são carregadas as informações */
    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      /** aqui estamos reaproveitando um styled component o Container que também está sendo usado no Main e provem de src/components/Container/index.js */
      <Container>
        {/* mostrando os dados principais do dono do repositório  */}
        <Owner>
          {/* link para retornar ao Main */}
          <Link to="/">Voltar aos repositórios</Link>
          {/* pegando a url da imagem do avatar e o login */}
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
