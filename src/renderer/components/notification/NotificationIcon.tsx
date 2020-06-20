import React, { FC } from 'react';
import styled from '@emotion/styled';
import { GoGitPullRequest, GoIssueOpened } from 'react-icons/all';

const Container = styled.div`
    align-self: center;
    justify-self: center;
`;

const renderTypeIcon = (type: string) => {
    switch (type) {
        case 'PullRequest':
            return <GoGitPullRequest size={26} color="limegreen"/>;
        case 'Issue':
            return <GoIssueOpened size={26} color="tomato"/>;
        default:
            return 'unrecognized notification type';
    }
};

export interface NotificationIconProps {
    iconType: string; // FIXME: Review type
}

export const NotificationIcon: FC<NotificationIconProps> = ({ iconType }) => {
    const renderedIcon = renderTypeIcon(iconType);
    return <Container>{renderedIcon}</Container>;
};
