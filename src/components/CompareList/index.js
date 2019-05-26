import React from 'react';
import { Container, Repository } from './styles';

function CompareList() {
  return (
    <Container>
      <Repository>
        <header>
          <img src="https://avatars3.githubusercontent.com/u/69631?v=4" alt="Facebook" />
          <strong>React</strong>
          <small>Facebook</small>
        </header>

        <ul>
          <li>
            95,000 <small>stars</small>
          </li>
          <li>
            95,000 <small>forks</small>
          </li>
          <li>
            95,000 <small>issues</small>
          </li>
          <li>
            3 days ago <small>last commit</small>
          </li>
        </ul>
      </Repository>
    </Container>
  );
}

export default CompareList;
