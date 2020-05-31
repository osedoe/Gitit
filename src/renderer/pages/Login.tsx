import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const sendNotification = () =>
    new Notification('Test', {
        body: 'You are not logged in'
    });

export const Login: FC = () => {
    const [isLogged, setIsLogged] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!isLogged) {
            sendNotification();
        }
    }, [isLogged]);

    const handleInputChange = (event: any) => {
        const name = event.target.getAttribute('name');
        if (name === 'username') {
            setUsername(event.target.value);
        } else if (name === 'password') {
            setPassword(event.target.value);
        }
    };

    return (
        <Container>
            <h2>Sign in</h2>
            <input
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleInputChange}
                />
            <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleInputChange}
                />
        </Container>
    );
};
