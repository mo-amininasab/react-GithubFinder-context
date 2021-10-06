import React from 'react';

// cmp
import RepoItem from './RepoItem';

const Repos = ({ repos }) => {
  return repos.map((repo) => <RepoItem key={repo.id} repo={repo} />);
};

export default Repos;
