import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const FullSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      position="absolute"
      top="0"
      left="0"
    >
      <CircularProgress size={50} style={{ color: '#415e1e' }} />
    </Box>
  );
};

export default FullSpinner;
