import React, { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    border: 1px solid white;
    padding: 6px;
`;

const H3 = styled.h3`
    margin: 0;
`;

const P = styled.p`
    margin: 0;
`;

interface NotificationContent {
    subject: {
        title: string;
        [key: string]: any;
    };
    repository: {
        name: string;
        [key: string]: any;
    };

    [key: string]: any;
}

export interface NotificationItemProps {
    content: NotificationContent;
}

const renderTypeIcon = (type: string) => {
    console.warn('NOT IMPLEMENTED');
    switch (type) {
        case 'PullRequest':
            return;
        case 'Issue':
            // TODO: Add icons
            return;
        default:
            return 'unrecognized notification type';
    }
};

export const NotificationItem: FC<NotificationItemProps> = ({ content }) => {
    const { title, type, url } = content.subject;
    const notificationNumber = url.substr(url.lastIndexOf('/') + 1);
    const { name: repoName } = content.repository;
    const icon = renderTypeIcon(type);
    return (
        <Container>
            <span>{type}</span>
            <H3>{title}</H3>
            <P>
                {repoName} #{notificationNumber}
            </P>
        </Container>
    );
};
