import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { authGithub } from '../utils/Oauth';
import { OAuthConfig } from '../utils/variables';

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

    useEffect(() => {
        if (!isLogged) {
            sendNotification();
        }
    }, [isLogged]);

    const handleOnClick = () => {
        authGithub(setIsLogged);
    };

    const handleReviewAccess = () => {
        fetch(`settings/connections/applications/${OAuthConfig.clientId}`)
            .then(console.log)
            .catch(console.error);
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

    return (
        <Container>
            <h2>Sign in</h2>
            <Button onClick={handleOnClick}>LOGIN NOW</Button>
        </Container>
    );
};
