import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import {
  Table as RTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import useStyles from './styles';

const Table = ({ data = [] }) => {
  const classes = useStyles();
  const headings = (!!data.length && Object.keys(data[0])) || [];

  return data.length ? (
    <Paper elevation={3} className={classes.paper}>
      <RTable className={classes.table}>
        <Thead>
          <Tr>
            {headings.map((heading) => (
              <Th key={heading}>
                <Typography variant="h6" className={classes.title}>
                  {heading}
                </Typography>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item[headings[0]]}>
              {headings.map((head) => (
                <Td key={head}>
                  {typeof item[head] === 'object' ? (
                    item[head]
                  ) : (
                    <Typography>{item[head]}</Typography>
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </RTable>
    </Paper>
  ) : (
    <Typography variant="h6" className={classes.noItemsToShow}>
      Não existem resultados a serem exibidos
    </Typography>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
