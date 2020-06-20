import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { OAuthConfig } from '../utils/variables';
import { useLoginContext } from '../context/login/loginContext';
import { requestWithAuthorization } from '../utils/Oauth';

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
    const [isLogged, setIsLogged] = useState(false);
    const [tokenValue, setTokenValue] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [state, dispatch] = useLoginContext();
    useEffect(() => {
        if (!isLogged) {
            sendNotification();
        }
    }, [isLogged]);

    const handleSaveToken = () => {
        // authGithub(setIsLogged);
        dispatch({ type: 'SET_TOKEN', token: tokenValue });
    };

    const handleLogin = async () => {
        const response = await requestWithAuthorization('user', {
            Authorization: `Basic ${btoa(`${username}:${tokenValue}`)}`
        });
        console.log('🍓', response);
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

    if (isLogged) {
        // TODO:
        return (
            <Container>
                <h2>You are logged in</h2>
                <button onClick={handleReviewAccess}>REVIEW ACCESS</button>
            </Container>
        );
    }
    console.log(state);
    return (
        <Container>
            <h2>Type in a personal access token to allow permissons for the app:</h2>
            <input name="token" value={tokenValue} onChange={handleInputChange}/>
            <Button onClick={handleSaveToken}>Save token</Button>
            <br/>
            <input name="username" value={username} onChange={handleUsernameChange}/>
            <Button onClick={handleLogin}>LOGIN</Button>
        </Container>
    );
};
