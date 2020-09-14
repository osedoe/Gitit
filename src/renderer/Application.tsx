import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter } from 'react-router-dom';
import { Colors } from './utils';
import { Navigation } from './components/navigation/Navigation';
import { DragBar } from './components/navigation/DragBar';
import { LoginProvider } from './context/login/loginContext';
import { Router } from './components/routes/Router';

const Container = styled.div`
    background: ${Colors.DARK_GRAY};
    box-sizing: border-box;
    margin: 0 5px 8px;
`;

const PageWrapper = styled.div`
    background: ${Colors.DARK_GRAY};
    color: ${Colors.WHITISH};
    padding: 0 7px;
    max-height: calc(800px - 68px); // Round of the header's height
    overflow: auto;
`;

const Application = () => {
  return <Container>
    <LoginProvider>
      <BrowserRouter>
        <DragBar/>
        <Navigation/>
        <PageWrapper>
          <Router/>
        </PageWrapper>
      </BrowserRouter>
    </LoginProvider>
  </Container>;
};

export default hot(Application);
