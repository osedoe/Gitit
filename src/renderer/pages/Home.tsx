import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import API from '../API';
import { Config, NotificationsResponse } from '../utils';
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

const renderNotificationItem = notification => {
  return <Li key={notification.id}>
    <NotificationItem content={notification}/>
  </Li>;
};

export const Home: FC = () => {
  // TODO: Add context
  // const { state } = useLoginContext();
  const [messages, setMessages] = useState<NotificationsResponse[]>();

  const authHeader = Config.getAuthHeader();
  useEffect(() => {
    if (authHeader) {
      API.getAllNotifications(true).then(response => {
        setMessages(response);
        console.log('💣', response);

        const threadId = response[0].id;

        API.getThread(threadId).then(result => {
          // TODO: Review thread for long polling
          console.log('🍉', result);
        });
      });
    }
  }, [authHeader]);

  const hasMessages = messages && messages.length > 0;
  return <Layout>
    <Ul>
      <NotificationWrapper>
        {hasMessages && messages.map(renderNotificationItem)}
      </NotificationWrapper>
    </Ul>
  </Layout>;
};
