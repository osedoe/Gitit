import React, { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    box-sizing: border-box;
    border-radius: 2px;
    height: 100vh;
`;

export const BaseLayout: FC = ({ children }) => {
  return <Container>{children}</Container>;
};
