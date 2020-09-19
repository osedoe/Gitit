import { useEffect, useState } from 'react';
import { Config } from '../Config';
import { useLoginContext } from '../../context/login/loginContext';
import { UserStore } from '../../models';

interface UseLoadUserFromStore {
  isAuthenticated: boolean;
  user: UserStore;
}

export const useLoadUserFromStore = (): UseLoadUserFromStore => {
  const { state: { isAuthenticated }, dispatchSetAuthHeader } = useLoginContext();
  const [user, setUser] = useState<UserStore>();

  useEffect(() => {
    if (!isAuthenticated) {
      Config.getLocalUser().then(result => {
        const {email, githubToken: token, authHeader} = result;
        console.log('🍓', result);
        setUser(result);
        console.log(`Loading user... [ ${email} ]`);
        dispatchInitializeLocalUser({ email: email, token, authHeader });
        dispatchSetAuthHeader({ email: email, githubToken: token });
      });
    }
  }, []);

  return {
    isAuthenticated,
    user
  };
};
