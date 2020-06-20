import React, { FC } from 'react';
import styled from '@emotion/styled';
import { FaCheck, FaSave } from 'react-icons/all';
import { NotificationIcon } from './NotificationIcon';
import { Colors } from '../../utils';

const Container = styled.div`
    border: 1px solid white;
    color: ${Colors.DARK_GRAY};
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: grid;
    grid-template-columns: 40px auto 40px 40px;
    grid-gap: 12px;
    align-items: center;
    padding: 6px;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
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

export const NotificationItem: FC<NotificationItemProps> = ({ content }) => {
    const { title, type, url } = content.subject;
    const notificationNumber = url.substr(url.lastIndexOf('/') + 1);
    const { full_name: repoName } = content.repository;
    return (
        <Container>
            <NotificationIcon iconType={type}/>
            <Main>
                <H3>{title}</H3>
                <P>
                    {repoName} #{notificationNumber}
                </P>
            </Main>
            <span>
                <FaCheck size={26} color={Colors.DARK_GRAY}/>
            </span>
            <span>
                <FaSave size={26} color={Colors.DARK_GRAY}/>
            </span>
        </Container>
    );
};
