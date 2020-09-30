import React from 'react';

import AuthPageLayout from 'components/AuthPageLayout';
import { formatMoney, dateToString } from 'utils/helpers';

import { useMyPayments } from 'queries/index';
import Table from 'components/Table';

const MyPayments = () => {
  const { payments, isFetching } = useMyPayments();

  return (
    <AuthPageLayout heading="Meus pagamentos" isFetching={isFetching}>
      {!isFetching && (
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
