import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories }) => (
  <Container>
    {repositories.map(repo => (
      <Repository key={repo.id}>
        <header>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <strong>{repo.name}</strong>
          <small>{repo.owner.login}</small>
        </header>

        <ul>
          <li>
            {repo.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repo.forks_count} <small>forks</small>
          </li>
          <li>
            {repo.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repo.pushed_at} <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);

const content = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  stargazers_count: PropTypes.number.isRequired,
  forks_count: PropTypes.number.isRequired,
  open_issues_count: PropTypes.number.isRequired,
  pushed_at: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.shape(content)).isRequired,
};

export default CompareList;
