import React from 'react';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';
import { FindRepository } from '../../services/api/Repository';

class Main extends React.Component {
  state = {
    repositoryInput: '',
    repositories: [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { repositories, repositoryInput } = this.state;
    try {
      const response = await FindRepository(repositoryInput);
      this.setState({ repositories: [...repositories, response.data] });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { repositories, repositoryInput } = this.state;
    return (
      <Container>
        <img src={logo} alt="GITCOMPARE" />

        <Form onSubmit={this.handleSubmit}>
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
