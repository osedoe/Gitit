import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import { Home, Login } from './pages';
import { Colors } from './utils/base';
import { Navigation } from './components/navigation/Navigation';
import { DragBar } from './components/navigation/DragBar';
import { LoginProvider } from './context/login/loginContext';

const Container = styled.div`
    background: ${Colors.WHITISH};
    box-sizing: border-box;
    margin: 0 5px 8px;
`;

const PageWrapper = styled.div`
    background: ${Colors.WHITE};
    color: ${Colors.DARK_GRAY};
    padding: 0 7px;
`;

const Application = () => {
    return (
        <Container>
            <LoginProvider>
                <Router>
                    <DragBar/>
                    <Navigation/>
                    <PageWrapper>
                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </PageWrapper>
                </Router>
            </LoginProvider>
        </Container>
    );
};

export default hot(Application);
