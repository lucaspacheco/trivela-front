import React from 'react';
import RT from 'react-super-responsive-table';
import { Typography, Paper } from '@material-ui/core';

import AuthPageLayout from 'components/AuthPageLayout';
import { formatMoney, dateToString } from 'utils/helpers';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useMyPayments } from 'queries/index';
import useStyles from './styles';

const MyPayments = () => {
  const classes = useStyles();
  const { payments, isFetching } = useMyPayments();

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
                Valor
              </Typography>
            </RT.Th>
            <RT.Th>
              <Typography variant="h6" className={classes.title}>
                Processado em
              </Typography>
            </RT.Th>
            <RT.Th>
              <Typography variant="h6" className={classes.title}>
                Método
              </Typography>
            </RT.Th>
            <RT.Th>
              <Typography variant="h6" className={classes.title}>
                Status
              </Typography>
            </RT.Th>
          </RT.Tr>
        </RT.Thead>
        <RT.Tbody>
          {payments.map((payment) => (
            <RT.Tr key={payment.id}>
              <RT.Td>
                <Typography variant="body2">{payment.id}</Typography>
              </RT.Td>
              <RT.Td className={classes.paymentValue}>
                <Typography variant="subtitle1">
                  {formatMoney(payment.value)}
                </Typography>
              </RT.Td>
              <RT.Td>
                <Typography variant="subtitle1">
                  {dateToString(payment.processingDate)}
                </Typography>
              </RT.Td>
              <RT.Td>
                <Typography variant="subtitle1">{payment.method}</Typography>
              </RT.Td>
              <RT.Td>
                <Typography variant="subtitle1">{payment.status}</Typography>
              </RT.Td>
            </RT.Tr>
          ))}
        </RT.Tbody>
      </RT.Table>
    </Paper>
  );

  return (
    <AuthPageLayout heading="Meus pagamentos" isFetching={isFetching}>
      {Table}
      {!isFetching && !payments.length && (
        <Typography variant="h6" className={classes.noPayments}>
          Não existem pagamentos a serem exibidos.
        </Typography>
      )}
    </AuthPageLayout>
  );
};

export default MyPayments;
