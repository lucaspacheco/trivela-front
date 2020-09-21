import React from 'react';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core';

import AuthPageLayout from 'components/AuthPageLayout';
import LeagueCard from 'components/LeagueCard';
import api from 'services/api';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
  },
}));

const Leagues = () => {
  const classes = useStyles();
  const {
    data: { data: { leagues = [] } = {} } = {},
    isFetching,
  } = useQuery('leagues', () => api.get('/leagues'));

  return (
    <AuthPageLayout heading="Ligas" isFetching={isFetching}>
      {leagues.map((league) => (
        <LeagueCard className={classes.card} key={league.id} league={league} />
      ))}
    </AuthPageLayout>
  );
};

export default Leagues;
