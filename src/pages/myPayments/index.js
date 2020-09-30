import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import AuthPageLayout from 'components/AuthPageLayout';
import { formatMoney, dateToString } from 'utils/helpers';

import { useMyPayments } from 'queries/index';
import Table from 'components/Table';

const MyPayments = () => {
  const { payments, isFetching } = useMyPayments();

  return (
    <AuthPageLayout
      heading="Meus pagamentos"
      isFetching={isFetching}
      showShimmer={!payments.length && isFetching}
      shimmerComponent={
        <Skeleton variant="rect" animation="wave" width="100%" height={500} />
      }
    >
      {(!isFetching || !!payments.length) && (
        <Table
          data={payments.map((item) => ({
            ID: item.id,
            Valor: formatMoney(item.value),
            'Processado em': dateToString(item.processingDate),
            Método: item.method,
            Status: item.status,
          }))}
        />
      )}
    </AuthPageLayout>
  );
};

export default MyPayments;
