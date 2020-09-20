import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Colors, Config, githubRequest } from '../utils';
import { LoginState, useLoginContext } from '../context/login';

const Container = styled.div`
  color: ${Colors.WHITE};
  background: ${Colors.DARK_GRAY};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

const sendGuestNotification = () => new Notification('Test', { body: 'You are not logged in' });

const sendLoggedOnNotification = (username: string) => new Notification(`Logged as ${username}`);

const sendLoginErrorNotification = error => new Notification('There has been an error trying to log in', { body: error });

const authenticateWithGithub = async (authHeader: string) => {
  try {
    const result = await githubRequest('user', { Authorization: authHeader });

    sendLoggedOnNotification(result.login);
  } catch (error) {
    sendLoginErrorNotification(error);
  }
};

const saveUserDataInStore = async (state: LoginState) => {
  const { email, githubToken, authHeader } = state;
  console.log('🦊', state);
  return Config.setLocalUser({ email, githubToken, authHeader });
};

export const Login = () => {
  const navigate = useNavigate();

  const { state, dispatchGenerateAuthHeader, dispatchUpdateLoginCredentials } = useLoginContext();
  const { isAuthenticated } = state;

  const [tokenValue, setTokenValue] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      sendGuestNotification();
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      dispatchGenerateAuthHeader({ email, githubToken: tokenValue });
      console.log('🍉', Config.getAuthHeader());
      await authenticateWithGithub(Config.getAuthHeader());
      dispatchUpdateLoginCredentials({ email, githubToken: tokenValue });
      await saveUserDataInStore({ email, githubToken: tokenValue, authHeader: Config.getAuthHeader() });

      navigate('/');
    } catch (err) {
      // TODO: Add ErrorHandler w/ custom exceptions
      console.error(err);
    }
  };

  const handleReviewAccess = () => {
    // TODO: Review this - Do we need it?
    console.warn('TO DO');
    // fetch(`settings/connections/applications/${OAuthConfig.clientId}`)
    //   .then(console.log)
    //   .catch(console.error);
  };

  const handleEmailChange = ({ currentTarget }) => setEmail(currentTarget.value);
  const handleTokenChange = ({ currentTarget }) => setTokenValue(currentTarget.value);

  if (isAuthenticated) {
    return <Container>
      <p>You are logged in</p>
    </Container>;
  }

  return <Container>
    <h2>
      Type in your GitHub email and create a personal access token to allow permissions
      for the app:
    </h2>
    <label aria-labelledby="email" htmlFor="email">
      Github email:
      <input id="email" name="email" value={email} onChange={handleEmailChange}/>
    </label>
    <label htmlFor="token">
      Github token:
      <input id="token" name="token" value={tokenValue} onChange={handleTokenChange}/>
    </label>
    <button aria-label="login button" onClick={handleLogin}>
      LOGIN
    </button>
  </Container>;
};
