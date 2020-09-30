import { useQuery } from 'react-query';
import api from 'services/api';

export const useMyTeams = () => {
  const {
    data: { data: { teams = [] } = {} } = {},
    isFetching,
  } = useQuery('my-teams', () => api.get('/my-teams'));

  return {
    teams,
    isFetching,
  };
};

export const useLeagues = () => {
  const {
    data: { data: { leagues = [] } = {} } = {},
    isFetching,
  } = useQuery('leagues', () => api.get('/leagues'));

  return {
    leagues,
    isFetching,
  };
};
