import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAppStore from 'components/App/store';

const PrivateRoute = ({ exact, path, component }) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Redirect to="/login" />;

  return <Route exact={exact} path={path} component={component} />;
};

export default PrivateRoute;
