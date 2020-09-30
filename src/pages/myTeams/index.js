import React from 'react';
import RT from 'react-super-responsive-table';
import { Delete as DeleteIcon } from '@material-ui/icons';
import {
  IconButton,
  Tooltip,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import AuthPageLayout from 'components/AuthPageLayout';
import RenderImg from 'components/RenderImg';
import { useMyTeams } from 'queries/index';
import useStyles from './styles';

const MyTeams = () => {
  const classes = useStyles();
  const { teams, isFetching } = useMyTeams();

  const Table = (
    <Paper className={classes.paper} elevation={3}>
      <RT.Table className={classes.table}>
        <RT.Thead>
          <RT.Tr>
            <RT.Th>
              <Typography variant="h6" className={classes.title}>
                ID
              </Typography>
            </RT.Th>
            <RT.Th>
              <Typography variant="h6" className={classes.title}>
                Time
              </Typography>
            </RT.Th>
            <RT.Th>
              <Typography variant="h6" className={classes.title}>
                Ações
              </Typography>
            </RT.Th>
          </RT.Tr>
        </RT.Thead>
        <RT.Tbody>
          {teams.map((team) => (
            <RT.Tr key={team.id}>
              <RT.Td>
                <Typography variant="body2">{team.id}</Typography>
              </RT.Td>
              <RT.Td className={classes.teamName}>
                <div>
                  <RenderImg src={team.imageUrl} width={28} height={28} />
                  <div>
                    <Typography variant="subtitle1">{team.name}</Typography>
                    <Typography variant="caption">
                      Cartoleiro: {team.cartolaName}
                    </Typography>
                  </div>
                </div>
              </RT.Td>
              <RT.Td>
                <Tooltip title="Excluir time">
                  <IconButton
                    className={classes.button}
                    onClick={() => console.log('delete ID:', team.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </RT.Td>
            </RT.Tr>
          ))}
        </RT.Tbody>
      </RT.Table>
    </Paper>
  );

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
      {Table}
      {!isFetching && !teams.length && (
        <Typography variant="h6" className={classes.noTeams}>
          Ops! Não existem times cadastrados.
          <Typography variant="h6">
            Que tal
            <Button variant="contained" color="primary">
              Adicionar um time
            </Button>
            para começar?
          </Typography>
        </Typography>
      )}
    </AuthPageLayout>
  );
};

export default MyTeams;
