import React from 'react';
import moment from 'moment';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';
import { FindRepository } from '../../services/api/Repository';

class Main extends React.Component {
  state = {
    loading: false,
    repositoryInput: '',
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

    const { repositories, repositoryInput } = this.state;
    try {
      const { data: repository } = await FindRepository(repositoryInput);

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
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories,
      repositoryInput,
      repositoryError,
      loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="GITCOMPARE" />

        <Form error={repositoryError} onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
            placeholder="Usuário/Reposotório"
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}

export default Main;
