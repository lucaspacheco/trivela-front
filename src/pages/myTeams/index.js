import React from 'react';
import { useQuery } from 'react-query';
import { Typography, makeStyles, CircularProgress } from '@material-ui/core';

import AuthPageLayout from 'components/AuthPageLayout';
import api from 'services/api';

const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
}));

const MyTeams = () => {
  const classes = useStyles();
  const { data = [], isFetching } = useQuery('my-teams', () =>
    api.get('/my-teams'),
  );

  return (
    <AuthPageLayout>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title} color="primary" variant="h3">
          Meus times
        </Typography>
        {isFetching && <CircularProgress size={28} />}
      </div>
    </AuthPageLayout>
  );
};

export default MyTeams;
