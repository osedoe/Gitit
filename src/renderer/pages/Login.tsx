import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { githubRequest, OAuthConfig } from '../utils';
import { useLoginContext } from '../context/login/loginContext';

/**
 * @deprecated
 */
const GITHUB_URL = 'https://github.com/login/oauth/authorize';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
`;

const Button = styled.button``;

const sendNotification = () => {
    return new Notification('Test', {
        body: 'You are not logged in'
    });
};

export const Login: FC = () => {
    const areCredentialsStored = Boolean(window.localStorage.getItem('authHeader'));
    const [hasAuth, setHasAuth] = useState(areCredentialsStored);
    const [tokenValue, setTokenValue] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { state, dispatchSetAuthToken } = useLoginContext();

    useEffect(() => {
        if (!hasAuth) {
            sendNotification();
        }
    }, [hasAuth]);

    const handleLogin = async () => {
        try {
            const response = await githubRequest('user', {
                Authorization: `Basic ${btoa(`${username}:${tokenValue}`)}`
            });
            // TODO: Feedback to user
            console.log('Successfully logged!!!', response);
        } catch (error) {
            // TODO: Feedback to user
            console.error('There\'s been an error trying to authenticate your user', error);
        }

        dispatchSetAuthToken({ username, token: tokenValue });
    };

    const handleReviewAccess = () => {
        fetch(`settings/connections/applications/${OAuthConfig.clientId}`)
            .then(console.log)
            .catch(console.error);
    };

    const handleInputChange = ({ currentTarget }) => {
        const { value } = currentTarget;
        setTokenValue(value);
    };

    const handleUsernameChange = ({ currentTarget }) => {
        const { value } = currentTarget;
        setUsername(value);
    };

    if (hasAuth) {
        // TODO:
        return (
            <Container>
                <h2>You are logged in</h2>
                <button onClick={handleReviewAccess}>REVIEW ACCESS</button>
            </Container>
        );
    }
    console.log('🍓login:', state);
    return (
        <Container>
            <h2>
                Type in your GitHub username and create a personal access token to allow permissions
                for the app:
            </h2>
            <input name="username" value={username} onChange={handleUsernameChange}/>
            <input name="token" value={tokenValue} onChange={handleInputChange}/>
            <Button onClick={handleLogin}>LOGIN</Button>
        </Container>
    );
};
