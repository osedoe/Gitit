import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import OldAPI from '../OldAPI';
import { Colors, NotificationsResponse } from '../utils';
import { BaseLayout } from '../components/BaseLayout';
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

const Span = styled.span`
  color: ${Colors.WHITISH};
`;

const renderNotificationItem = notification => {
  return <Li key={notification.id}>
    <NotificationItem content={notification}/>
  </Li>;
};

export const Home: FC = () => {
  const { state } = useLoginContext();

  const [messages, setMessages] = useState<NotificationsResponse[]>();

  useEffect(() => {
    if (state.isAuthenticated) {
      OldAPI.getAllNotifications(state.authHeader, { all: true }).then(response => {
        setMessages(response);
        console.log('✅', 'Getting messages', response);

        // const threadId = response[0].id;

        // API.getThread(threadId).then(result => {
        //   // TODO: Review thread for long polling
        //   console.log('🍉', result);
        // });ga
      }).catch(err => {
        console.warn('🛑', err);
      });
    }
  }, [state.isAuthenticated]);

  const hasMessages = messages && messages.length > 0;
  console.log('home');
  if (!hasMessages) {
    return <BaseLayout>
      NO MESSAGES
    </BaseLayout>;
  }

  return <BaseLayout>
    <Ul>
      <NotificationWrapper>
        {hasMessages && messages.map(renderNotificationItem)}
      </NotificationWrapper>
    </Ul>
  </BaseLayout>;
};
