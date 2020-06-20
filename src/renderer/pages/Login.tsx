import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { OAuthConfig } from '../utils/variables';
import { useLoginContext } from '../context/login/loginContext';
import { githubRequest } from '../utils/Oauth';

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
            console.log('🍓', response);
        } catch (error) {
            console.error(error);
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

    console.log(state, hasAuth);

    if (hasAuth) {
        // TODO:
        return (
            <Container>
                <h2>You are logged in</h2>
                <button onClick={handleReviewAccess}>REVIEW ACCESS</button>
            </Container>
        );
    }

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
