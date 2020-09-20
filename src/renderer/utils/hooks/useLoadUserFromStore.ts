import { useEffect } from 'react';
import { Config } from '../Config';
import { useLoginContext } from '../../context/login';

interface UseLoadUserFromStore {
  isAuthenticated: boolean;
}

export const useLoadUserFromStore = (): UseLoadUserFromStore => {
  const { state: { isAuthenticated }, dispatchGenerateAuthHeader, dispatchUpdateLoginCredentials } = useLoginContext();

  useEffect(() => {
    if (!isAuthenticated) {
      Config.getLocalUser().then(result => {
        const encodedAuthHeader = `Basic ${btoa(`${result.email}:${result.githubToken}`)}`;
        const { email, githubToken } = result;

        console.log(`Loading user... [ ${email} ]`);

        // TODO: Review if authHeader is being set twice
        dispatchGenerateAuthHeader({ email, githubToken });
        dispatchUpdateLoginCredentials({ email, githubToken });
      });
    }
  }, [isAuthenticated]);

  return {
    isAuthenticated
  };
};
