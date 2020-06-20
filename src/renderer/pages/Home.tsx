import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import API from '../API';
import { NotificationsResponse } from '../utils';
import { Layout } from '../components/Layout';
import { NotificationItem } from '../components/notification/NotificationItem';
import { useLoginContext } from '../context/login/loginContext';

const Ul = styled.ul`
    padding: 0;
`;

const NotificationWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Li = styled.li`
    list-style-type: none;
`;

export const Home: FC = () => {
    const { state } = useLoginContext();
    const [messages, setMessages] = useState<NotificationsResponse[]>();

    const authHeader = window.localStorage.getItem('authHeader');
    useEffect(() => {
        if (authHeader) {
            API.getAllNotifications().then(response => {
                setMessages(response);
                console.log('💣', response);

                const threadId = response[0].id;

                API.getThread(threadId).then(result => {
                    console.log('🍉', result);
                });
            });
        }
    }, [state.isAuthenticated]);
    console.log('🍓login:', state);
    return <Layout>
        <Ul>
            <NotificationWrapper>
                {messages && messages.map(notification => {
                    console.log('🍌', notification);
                    return <Li key={notification.id}>
                        <NotificationItem content={notification}/>
                    </Li>;
                })}
            </NotificationWrapper>
        </Ul>
    </Layout>;
};
