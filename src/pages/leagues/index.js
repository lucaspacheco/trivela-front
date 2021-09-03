import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Alert from '@material-ui/lab/Alert';
import AuthPageLayout from 'components/AuthPageLayout';
import LeagueCard from 'components/LeagueCard';
import { useLeagues } from 'queries/index';
import api from 'services/api';


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
  const [vazio, setVazio] = useState(false);
  const { leagues, isFetching } = useLeagues();

  useEffect(()=>{
    api.get('/leagues')
     .then(res=>{      
      if(res.data.length === 0)
        {
          setVazio(true);
        }  
      (res.data);            
    })
      .catch(error=>{
        console.log(error);
    })
  }, []);

  return (
    
   
   
    <AuthPageLayout
      heading="Ligas"
      isFetching={isFetching}
      showShimmer={!leagues.length && isFetching}
      shimmerComponent={
        <Skeleton variant="rect" animation="wave" width="100%" height={600} />
      }    >

    {vazio?
    <div className={classes.root}>
      <Alert severity="error">
        Não há ligas cadastradas.
      </Alert>      
    </div> 
    :
      <div className={classes.cardsWrapper}>
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>
    }
    </AuthPageLayout>
  
  );
};

export default Leagues;
