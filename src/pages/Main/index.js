import React from 'react';
import moment from 'moment';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';
import { FindRepository } from '../../services/api/Repository';

class Main extends React.Component {
  state = {
    loading: false,
    inputUser: '',
    inputRepository: '',
    repositoryError: false,
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('@GitCompare:repositories')) || [];

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositories, inputUser, inputRepository } = this.state;
    try {
      const { data: repository } = await FindRepository(`${inputUser}/${inputRepository}`);

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem(
        '@GitCompare:repositories',
        JSON.stringify([...localRepositories, repository]),
      );
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false, inputUser: '', inputRepository: '' });
    }
  };

  handleRemoveRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem('@GitCompare:repositories', JSON.stringify(updatedRepositories));
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await FindRepository(repository.full_name);

      data.last_commit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        inputUser: '',
        inputRepository: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const {
      repositories,
      inputUser,
      inputRepository,
      repositoryError,
      loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="GITCOMPARE" />

        <Form error={repositoryError} onSubmit={this.handleSubmit}>
          <div className="container-input">
            <input
              type="text"
              value={inputUser}
              onChange={e => this.setState({ inputUser: e.target.value })}
              placeholder="Usuário"
            />
            <input
              type="text"
              value={inputRepository}
              onChange={e => this.setState({ inputRepository: e.target.value })}
              placeholder="Reposotório"
            />
          </div>
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.handleRemoveRepository}
          updateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}

export default Main;
