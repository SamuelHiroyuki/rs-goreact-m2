import React from 'react';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

function Main() {
  return (
    <Container>
      <img src={logo} alt="GITCOMPARE" />

      <Form>
        <input type="text" placeholder="Usuário/Reposotório" />
        <button type="submit">OK</button>
      </Form>
    </Container>
  );
}

export default Main;
