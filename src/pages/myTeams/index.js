import React from 'react';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { IconButton, Tooltip, Typography, Button } from '@material-ui/core';

import AuthPageLayout from 'components/AuthPageLayout';
import RenderImg from 'components/RenderImg';
import Table from 'components/Table';
import { useMyTeams } from 'queries/index';
import useStyles from './styles';

const MyTeams = () => {
  const classes = useStyles();
  const { teams, isFetching } = useMyTeams();

  return (
    <AuthPageLayout heading="Meus times" isFetching={isFetching}>
      {!!teams.length && (
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
        >
          Adicionar time
        </Button>
      )}
      {!isFetching && (
        <div className={classes.table}>
          <Table
            data={teams.map((team) => ({
              ID: team.id,
              Time: (
                <div className={classes.teamName}>
                  <RenderImg src={team.imageUrl} width={28} height={28} />
                  <div>
                    <Typography variant="subtitle1">{team.name}</Typography>
                    <Typography variant="caption">
                      Cartoleiro: {team.cartolaName}
                    </Typography>
                  </div>
                </div>
              ),
              Ações: (
                <Tooltip title="Excluir time">
                  <IconButton
                    className={classes.button}
                    onClick={() => console.log('delete ID:', team.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ),
            }))}
          />
        </div>
      )}
      {!isFetching && !teams.length && (
        <Typography variant="body1" className={classes.noTeams}>
          Que tal
          <Button variant="contained" color="primary">
            Adicionar um time
          </Button>
          para começar?
        </Typography>
      )}
    </AuthPageLayout>
  );
};

export default MyTeams;
