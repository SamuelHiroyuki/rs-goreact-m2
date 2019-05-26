import React from 'react';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

function Main() {
  return (
    <Container>
      <img src={logo} alt="GITCOMPARE" />

      <Form>
        <input type="text" placeholder="Usuário/Reposotório" />
        <button type="submit">OK</button>
      </Form>

      <CompareList />
    </Container>
  );
}

export default Main;
