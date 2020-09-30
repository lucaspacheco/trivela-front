import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import CartolaSearch from 'components/CartolaSearchBox';

const NewTeamModal = ({ open, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Adicionar novo time</DialogTitle>
      <DialogContent>
        <CartolaSearch onOptionChange={(value) => console.log(value)} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('add team')}
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTeamModal;
