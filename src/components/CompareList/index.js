import React from 'react';
import PropTypes from 'prop-types';
import {
  GoStar, GoGitBranch, GoIssueOpened, GoGitCommit,
} from 'react-icons/go';

import { Container, Repository } from './styles';

const iconStyle = { paddingTop: 4, marginRight: 5 };

const CompareList = ({ repositories }) => (
  <Container>
    {repositories.map((repo, index) => {
      const key = `${index}-${repo.id}`;
      return (
        <Repository key={key}>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <strong>{repo.name}</strong>
            <small>{repo.owner.login}</small>
          </header>

          <ul>
            <li>
              <GoStar style={iconStyle} />
              {repo.stargazers_count} <small>stars</small>
            </li>
            <li>
              <GoGitBranch style={iconStyle} />
              {repo.forks_count} <small>forks</small>
            </li>
            <li>
              <GoIssueOpened style={iconStyle} />
              {repo.open_issues_count} <small>issues</small>
            </li>
            <li>
              <GoGitCommit style={iconStyle} />
              {repo.last_commit} <small>last commit</small>
            </li>
          </ul>
        </Repository>
      );
    })}
  </Container>
);

const content = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  stargazers_count: PropTypes.number.isRequired,
  forks_count: PropTypes.number.isRequired,
  open_issues_count: PropTypes.number.isRequired,
  last_commit: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
};

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.shape(content)).isRequired,
};

export default CompareList;
