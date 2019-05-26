import React from 'react';
import moment from 'moment';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';
import { FindRepository } from '../../services/api/Repository';

class Main extends React.Component {
  state = {
    repositoryInput: '',
    repositoryError: false,
    repositories: [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { repositories, repositoryInput } = this.state;
    try {
      const { data: repository } = await FindRepository(repositoryInput);

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...repositories, repository],
        repositoryError: false,
      });
    } catch (error) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const { repositories, repositoryInput, repositoryError } = this.state;
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
          <button type="submit">OK</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}

export default Main;
