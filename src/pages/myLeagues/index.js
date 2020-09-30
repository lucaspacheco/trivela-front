import React from 'react';

import AuthPageLayout from 'components/AuthPageLayout';
import Table from 'components/Table';
import { useMyLeagues } from 'queries/index';
import { Typography } from '@material-ui/core';
import RenderImg from 'components/RenderImg';

const MyLeagues = () => {
  const { myLeagues, isFetching } = useMyLeagues();

  return (
    <AuthPageLayout heading="Minhas ligas" isFetching={isFetching}>
      {!isFetching && (
        <Table
          data={myLeagues.map((league) => ({
            ID: league.id,
            Liga: `Rodada ${league.round}`,
            Times: league.teams.map((team) => (
              <div
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
