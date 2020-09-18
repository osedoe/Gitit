import { useEffect, useState } from 'react';
import { Config } from '../Config';
import { UserStore } from '../../models';
import { useLoginContext } from '../../context/login/loginContext';

export const useLoadUser = () => {
  const { state, dispatchSetAuthToken } = useLoginContext();
  const [localUser, setLocalUser] = useState<UserStore>();

  useEffect(() => {
    Config.getLocalUser().then((result: UserStore) => {
      if (result) {
        setLocalUser(result);
        dispatchSetAuthToken({ email: result.email, token: result.githubToken });
      }
    });
  }, []);

  return {
    localUser,
    hasLocalUser: Boolean(localUser)
  };
};
