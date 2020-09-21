import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAppStore from './store';

const HistoryListener = () => {
  const history = useHistory();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  useEffect(() => {
    const redirectIfAuthenticated = () => isAuthenticated && history.push('/');

    const publicPages = ['/login', '/signup', '/forgot-password'];

    history.listen((location) => {
      if (isAuthenticated && publicPages.includes(location.pathname))
        redirectIfAuthenticated();
    });

    redirectIfAuthenticated();
  }, []);

  return null;
};

export default HistoryListener;
