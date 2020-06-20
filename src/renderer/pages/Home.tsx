import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import API from '../API';
import { NotificationsResponse } from '../utils/models';
import { Layout } from '../components/Layout';
import { NotificationItem } from '../components/notification/NotificationItem';

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
    const [messages, setMessages] = useState<NotificationsResponse[]>();

    useEffect(() => {
        API.getAllNotifications().then(response => {
            setMessages(response);
            console.log('💣', response);

            // const regExp = /[^/]+$/; // Matches everything after the last backlash
            // const threadId = response[0].url.match(regExp);

            // API.getThread(threadId).then(result => {
            //     console.log('🍉', result);
            // });
        });
    }, []);

    return (
        <Layout>
            {/* <h2>Notifications</h2> */}
            <Ul>
                <NotificationWrapper>
                    {messages &&
                        messages.map(notification => {
                            console.log('🍌', notification);
                            return (
                                <Li key={notification.id}>
                                    <NotificationItem content={notification}/>
                                </Li>
                            );
                        })}
                </NotificationWrapper>
            </Ul>
        </Layout>
    );
};
