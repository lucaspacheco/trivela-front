import { useQuery } from 'react-query';
import api from 'services/api';

export const useMyTeams = () => {
  const { data: { data: { teams = [] } = {} } = {}, isFetching } = useQuery(
    'my-teams',
    () => api.get('/my-teams'),
    {
      staleTime: 5 * 60 * 1000,
    },
  );

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

export const useHotLeagues = () => {
  const {
    data: { data: { leagues = [] } = {} } = {},
    isFetching,
  } = useQuery('hot-leagues', () => api.get('/hot-leagues'));

  return {
    leagues,
    isFetching,
  };
};

export const useMyPayments = () => {
  const {
    data: { data: { payments = [] } = {} } = {},
    isFetching,
  } = useQuery('my-payments', () => api.get('/my-payments'));

  return {
    payments,
    isFetching,
  };
};

export const useMyLeagues = () => {
  const {
    data: { data: { myLeagues = [] } = {} } = {},
    isFetching,
  } = useQuery('my-leagues', () => api.get('/my-leagues'));

  return {
    myLeagues,
    isFetching,
  };
};
