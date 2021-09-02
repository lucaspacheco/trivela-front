import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import AuthPageLayout from 'components/AuthPageLayout';
import { CircularProgress, Typography } from '@material-ui/core';
import LeagueCard from 'components/LeagueCard';
import { useHotLeagues } from 'queries/index';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();
  const { leagues, isFetching } = useHotLeagues();
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

      {!leagues.length && isFetching ? (
        <Skeleton
          variant="rect"
          animation="wave"
          width="100%"
          height={600}
          style={{ marginTop: '2.4rem' }}
        />
      ) : (
        <div className={classes.cardsWrapper}>
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      )}
    </AuthPageLayout>
  );
};

export default Home;
