import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import AuthPageLayout from 'components/AuthPageLayout';
import RenderImg from 'components/RenderImg';
import Table from 'components/Table';
import api from 'services/api';
import useStyles from './styles';

const LeaguePartials = () => {
  const classes = useStyles();
  const { id } = useParams();
  const {
    data: { data: { leaguePartials } = {} } = {},
    isFetching,
  } = useQuery(['league-partials', id], (_, queryId) =>
    api.get(`/league-partials/${queryId}`),
  );

  return (
    <AuthPageLayout
      heading="Parciais"
      isFetching={isFetching}
      showShimmer={!leaguePartials && isFetching}
      shimmerComponent={
        <Skeleton variant="rect" animation="wave" width="100%" height={500} />
      }
    >
      {!!leaguePartials && (
        <div className={classes.table}>
          <Typography
            className={classes.round}
            align="center"
            variant="h4"
            paragraph
          >
            {leaguePartials.label}
          </Typography>
          <Table
            data={leaguePartials.teams?.map((item) => ({
              Posição: `${item.position}º`,
              Time: (
                <div className={classes.teamName}>
                  <RenderImg src={item.imageUrl} width={28} height={28} />
                  <div>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="caption">
                      Cartoleiro: {item.cartolaName}
                    </Typography>
                  </div>
                </div>
              ),
              Pontuação: item.score,
            }))}
          />
        </div>
      )}
    </AuthPageLayout>
  );
};

export default LeaguePartials;
