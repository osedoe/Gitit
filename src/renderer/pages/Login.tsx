import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { Colors, githubRequest } from '../utils';
import { useLoginContext } from '../context/login/loginContext';
import { useLoadUser } from '../utils/hooks/useLoadUser';

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

const sendLoggedOnNotification = () => new Notification('Logged on');

const sendLoginErrorNotification = error => new Notification('There has been an error trying to log in', { body: error });

const authenticateWithGithub = async (email: string, tokenValue: string) => {
  try {
    await githubRequest('user', { Authorization: `Basic ${btoa(`${email}:${tokenValue}`)}` });
    sendLoggedOnNotification();
  } catch (error) {
    sendLoginErrorNotification(error);
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const { state, dispatchSetAuthToken } = useLoginContext();
  const { localUser, hasLocalUser } = useLoadUser();

  const [tokenValue, setTokenValue] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (!state.isAuthenticated) {
      sendGuestNotification();
    }
  }, [state.isAuthenticated]);

  const handleLogin = async () => {
    await authenticateWithGithub(email, tokenValue);
    dispatchSetAuthToken({ email, token: tokenValue });
    navigate('/');
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

  if (hasLocalUser) {
    return <Container>
      <p>You are logged in</p>
    </Container>;
  }
  console.log(456);
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
