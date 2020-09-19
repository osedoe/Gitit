import { useEffect } from 'react';
import { Config } from '../Config';
import { UserStore } from '../../models';
import { useLoginContext } from '../../context/login/loginContext';

interface UseLoadUserFromStore {
  isAuthenticated: boolean;
}

export const useLoadUserFromStore = (): UseLoadUserFromStore => {
  const { state: { isAuthenticated }, dispatchSetAuthToken } = useLoginContext();

  useEffect(() => {
    if (!isAuthenticated) {
      Config.getLocalUser()
        .then((result: UserStore) => {
          console.log(`Loading user... [ ${result.email} ]`);
          dispatchSetAuthToken({ email: result.email, token: result.githubToken });
        })
        .catch(error => {
          console.error('Error retrieving local user', error);
        });
    }
  }, []);

  return {
    isAuthenticated
  };
};
