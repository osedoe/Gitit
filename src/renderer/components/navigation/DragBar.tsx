import React, { FC } from 'react';
import styled from '@emotion/styled';

const Bar = styled.div`
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 22px;
    app-region: drag;
`;

export const DragBar: FC = () => <Bar/>;
