import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import useNotification from './store';

const selector = (state) => ({
  notification: state.notifications[0],
  hideNotification: state.hideNotification,
});

const Notification = () => {
  const [open, setOpen] = useState(false);
  const { notification, hideNotification } = useNotification(selector);

  useEffect(() => {
    if (notification) setOpen(!!notification);
  }, [notification]);

  const handleClose = () => setOpen(false);

  const handleExited = () => hideNotification();

  return (
    <Snackbar
      autoHideDuration={notification?.timeout || 5000}
      onClose={handleClose}
      onExited={handleExited}
      open={open}
    >
      <Alert
        onClose={handleClose}
        severity={notification?.type || 'info'}
        variant="filled"
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export const useNotify = () =>
  useNotification((state) => state.showNotification);

export default Notification;
