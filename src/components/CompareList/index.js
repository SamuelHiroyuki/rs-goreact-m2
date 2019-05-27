import React from 'react';
import PropTypes from 'prop-types';
import {
  GoStar, GoGitBranch, GoIssueOpened, GoGitCommit,
} from 'react-icons/go';

import { Container, Repository } from './styles';

const iconStyle = { paddingTop: 4, marginRight: 5 };

const CompareList = ({ repositories, removeRepository, updateRepository }) => (
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
          <div className="buttons-container">
            <button type="button" onClick={() => updateRepository(repo.id)}>
              <i className="fa fa-retweet" />
              Atualizar
            </button>
            <button type="button" onClick={() => removeRepository(repo.id)}>
              <i className="fa fa-trash" />
              Excluir
            </button>
          </div>
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
  removeRepository: PropTypes.func.isRequired,
  updateRepository: PropTypes.func.isRequired,
};

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.shape(content)).isRequired,
};

export default CompareList;
