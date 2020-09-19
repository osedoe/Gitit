import { useEffect } from 'react';
import { Config } from '../Config';
import { UserStore } from '../../models';
import { useLoginContext } from '../../context/login/loginContext';

export const useLoadUser = () => {
  const { state, dispatchSetAuthToken } = useLoginContext();

  const { isAuthenticated } = state;

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Retrieving local user...');
      Config.getLocalUser()
        .then((result: UserStore) => {
          dispatchSetAuthToken({ email: result.email, token: result.githubToken });
        })
        .catch(error => {
          console.error('Error retrieving local user', error);
        });
    }
  }, []);

  return {
    isAuthenticated: state.isAuthenticated
  };
};
