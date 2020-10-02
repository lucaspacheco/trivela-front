import React, { useState, memo } from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';

import useStore from './store';

const ShoppingCart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const leagues = useStore((state) => state.leagues);

  const handleClose = () => setModalOpen(false);

  return (
    <>
      <IconButton onClick={() => setModalOpen(true)}>
        <Badge badgeContent={leagues.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </>
  );
};

export default memo(ShoppingCart);
