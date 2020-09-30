import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import RT from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import useStyles from './styles';

const Table = ({ data }) => {
  const classes = useStyles();
  const headings = (!!data.length && Object.keys(data[0])) || [];

  return data.length ? (
    <Paper elevation={3} className={classes.paper}>
      <RT.Table className={classes.table}>
        <RT.Thead>
          <RT.Tr>
            {headings.map((heading) => (
              <RT.Th key={heading}>
                <Typography variant="h6" className={classes.title}>
                  {heading}
                </Typography>
              </RT.Th>
            ))}
          </RT.Tr>
        </RT.Thead>
        <RT.Tbody>
          {data.map((item) => (
            <RT.Tr key={item[headings[0]]}>
              {headings.map((head) => (
                <RT.Td key={head}>
                  <Typography>{item[head]}</Typography>
                </RT.Td>
              ))}
            </RT.Tr>
          ))}
        </RT.Tbody>
      </RT.Table>
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
