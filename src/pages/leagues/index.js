import React from 'react';
import { makeStyles } from '@material-ui/core';

import AuthPageLayout from 'components/AuthPageLayout';
import LeagueCard from 'components/LeagueCard';
import { useLeagues } from 'queries/index';

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
  const { leagues, isFetching } = useLeagues();

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
