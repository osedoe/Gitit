import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../utils/base';

const Container = styled.div`
    background: ${Colors.WHITISH};
    box-sizing: border-box;
    border-radius: 2px;
`;

export const BaseLayout: FC = ({ children }) => {
    return <Container>{children}</Container>;
};
