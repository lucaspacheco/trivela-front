import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography } from '@material-ui/core';

import AuthPageLayout from 'components/AuthPageLayout';
import Table from 'components/Table';
import { useMyLeagues } from 'queries/index';
import RenderImg from 'components/RenderImg';

const MyLeagues = () => {
  const { myLeagues, isFetching } = useMyLeagues();

  return (
    <AuthPageLayout
      heading="Minhas ligas"
      isFetching={isFetching}
      showShimmer={!myLeagues.length && isFetching}
      shimmerComponent={
        <Skeleton variant="rect" animation="wave" width="100%" height={300} />
      }
    >
      {(!isFetching || !!myLeagues.length) && (
        <Table
          data={myLeagues.map((league) => ({
            ID: league.id,
            Liga: `Rodada ${league.round}`,
            Times: league.teams.map((team) => (
              <div
                key={team.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '1rem 0',
                }}
              >
                <RenderImg src={team.imageUrl} width={28} />
                <Typography style={{ marginLeft: '1rem' }} key={team.id}>
                  {team.name}
                </Typography>
              </div>
            )),
          }))}
        />
      )}
    </AuthPageLayout>
  );
};

export default MyLeagues;
