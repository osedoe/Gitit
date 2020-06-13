import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import API from '../API';
import { NotificationsResponse } from '../utils/models';

const Container = styled.div``;

const Ul = styled.ul`
    padding: 0;
`;

const Li = styled.li`
    border: 2px solid red;
    list-style-type: none;
`;

const NotificationContainer = styled.div`
    border: 1px solid white;
    padding: 6px;
`;

const H3 = styled.h3`
    margin: 0;
`;

const P = styled.p`
    margin: 0;
`;

export const Home: FC = () => {
    const [results, setResults] = useState<NotificationsResponse[]>();

    useEffect(() => {
        API.getAllNotifications().then(response => {
            setResults(response);
        });
    }, []);

    return (
        <Container>
            <h2>Notifications</h2>
            <Ul>
                {results &&
                    results.map(notification => {
                        console.log('🍌', notification);
                        return (
                            <Li key={notification.id}>
                                <NotificationContainer>
                                    <H3>{notification.subject.title}</H3>
                                    <P>{notification.repository.name}</P>
                                </NotificationContainer>
                            </Li>
                        );
                    })}
            </Ul>
        </Container>
    );
};
