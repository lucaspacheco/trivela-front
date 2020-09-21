import React from 'react';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core';

import AuthPageLayout from 'components/AuthPageLayout';
import LeagueCard from 'components/LeagueCard';
import api from 'services/api';

const useStyles = makeStyles((theme) => ({
  cardsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridGap: theme.spacing(6),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
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
      <div className={classes.cardsWrapper}>
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>
    </AuthPageLayout>
  );
};

export default Leagues;
