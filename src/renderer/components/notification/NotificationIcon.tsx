import React, { FC } from 'react';
import styled from '@emotion/styled';
import { FaExclamationCircle, FaHardHat, GoGitPullRequest, GoIssueOpened, GoTag } from 'react-icons/all';
import { Colors } from '../../utils';

const Container = styled.div`
    align-self: center;
    justify-self: center;
`;

const renderTypeIcon = (type: string) => {
    switch (type) {
        case 'PullRequest':
            return <GoGitPullRequest size={26} color={Colors.GREEN_FROG}/>;
        case 'Issue':
            return <GoIssueOpened size={26} color={Colors.PINK_CHEWING_GUM}/>;
        case 'CheckSuite':
            return <FaHardHat size={26} color={Colors.ORANGE_WORKER}/>;
        case 'Release':
            return <GoTag size={26} color={Colors.BLUE}/>;
        default:
            return <FaExclamationCircle size={26} color={Colors.DARK_GRAY}/>;
    }
};

export interface NotificationIconProps {
    iconType: string; // FIXME: Review type
}

export const NotificationIcon: FC<NotificationIconProps> = ({ iconType }) => {
    const renderedIcon = renderTypeIcon(iconType);
    return <Container>{renderedIcon}</Container>;
};
