import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import API from '../API';

const Container = styled.div``;

export const NotificationList: FC = () => {
    const [results, setResults] = useState();

    useEffect(() => {
        API.getAllNotifications().then(response => {
            setResults(response);
            console.log('🍓', response);
        });
    }, []);

    return <Container>notifications</Container>;
};
