import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAppStore from './store';

const HistoryListener = () => {
  const history = useHistory();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  useEffect(() => {
    const publicPages = ['/login', '/signup', '/forgot-password'];

    const redirectIfAuthenticated = () =>
      isAuthenticated &&
      publicPages.includes(history.location.pathname) &&
      history.push('/');

    redirectIfAuthenticated();
  }, []);

  return null;
};

export default HistoryListener;
