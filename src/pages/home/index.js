import React from 'react';
import { useQuery } from 'react-query';
import Skeleton from '@material-ui/lab/Skeleton';

import AuthPageLayout from 'components/AuthPageLayout';
import { CircularProgress, Typography } from '@material-ui/core';
import LeagueCard from 'components/LeagueCard';
import api from 'services/api';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();
  const {
    data: { data: { hotLeagues = [] } = {} } = {},
    isFetching,
  } = useQuery('hot-leagues', () => api.get('/hot-leagues'));

  return (
    <AuthPageLayout>
      <Typography
        variant="h4"
        color="primary"
        className={classes.welcomeMessage}
      >
        Seja bem vindo(a) ao
        <span className={classes.name}>Trivela Smart Club</span>
      </Typography>

      <Typography variant="h5" className={classes.sectionHeading}>
        Confira as ligas em destaque
        {isFetching && <CircularProgress size={32} />}
      </Typography>

      {!hotLeagues.length && isFetching ? (
        <Skeleton variant="rect" animation="wave" width="100%" height={600} />
      ) : (
        <div className={classes.cardsWrapper}>
          {hotLeagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      )}
    </AuthPageLayout>
  );
};

export default Home;
