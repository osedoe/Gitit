import { useEffect, useState } from 'react';
import { Config } from '../Config';
import { UserStore } from '../../models';

export const useLoadUser = () => {
  const [localUser, setLocalUser] = useState<UserStore>();

  useEffect(() => {
    Config.getLocalUser().then(result => {
      if (result) {
        setLocalUser(result);
      }
    });
  }, []);

  return {
    localUser,
    hasLocalUser: Boolean(localUser)
  };
};
