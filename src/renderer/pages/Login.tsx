import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';

const GITHUB_URL = 'https://github.com/login/oauth/authorize';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
        console.log(123);
    };

    return (
        <Container>
            <h2>Sign in</h2>
            <Button onClick={handleOnClick}>LOGIN NOW</Button>
        </Container>
    );
};
