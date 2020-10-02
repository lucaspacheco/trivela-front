import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import clsx from 'clsx';

import { formatMoney, dateToString } from 'utils/helpers';
import useStyles from './styles';

const LeagueCard = ({ className, league }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={clsx(classes.cardWrapper, className)}>
      <div className={classes.cardHeader}>
        <Typography variant="h6">Rodada #{league.round}</Typography>
      </div>

      <div className={classes.cardContent}>
        <Typography>
          Participantes: <span>{league.players}</span>
        </Typography>
        <Typography>
          Premiação: <span>{formatMoney(league.cashPrize)}</span>
        </Typography>
        {league.registrationClosed ? (
          <>
            <Typography>Inscrições encerradas</Typography>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <Typography
                variant="body1"
                onClick={() =>
                  history.push(`/league/${league.id}/partials`, {
                    leagueId: league.id,
                  })
                }
              >
                Parciais
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Typography>
              Inscrições até:{' '}
              <span>{dateToString(league.registrationLimit)}</span>
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <Typography variant="body1">Adicionar</Typography>
              <AddIcon />
            </Button>
          </>
        )}
      </div>
      <div className={classes.priceWrapper}>
        <Typography variant="h4">{formatMoney(league.price)}</Typography>
      </div>
    </div>
  );
};

LeagueCard.propTypes = {
  className: PropTypes.string,
  league: PropTypes.shape({
    id: PropTypes.number,
    round: PropTypes.number,
    players: PropTypes.number,
    cashPrize: PropTypes.number,
    registrationClosed: PropTypes.bool,
    registrationLimit: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

LeagueCard.defaultProps = {
  className: '',
};

export default LeagueCard;
