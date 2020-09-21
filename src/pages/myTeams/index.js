import React from 'react';
import { useQuery } from 'react-query';

import AuthPageLayout from 'components/AuthPageLayout';
import api from 'services/api';

const MyTeams = () => {
  const { data = [], isFetching } = useQuery('my-teams', () =>
    api.get('/my-teams'),
  );

  return (
    <AuthPageLayout heading="Meus times" isFetching={isFetching}>
      <p>Conteudo: {data.length}</p>
    </AuthPageLayout>
  );
};

export default MyTeams;
