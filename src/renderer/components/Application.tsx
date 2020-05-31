import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import { Home, Login } from '../pages';
import { Colors } from '../utils/base';
import { Navigation } from './Navigation';

const TopBar = styled.div`
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 22px;
    app-region: drag;
`;

const Container = styled.div`
    background: ${Colors.DARK_GRAY};
`;

const Application = () => {
    return (
        <Router>
            <TopBar/>
            <Container>
                <Navigation/>
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
            </Container>
        </Router>
    );
};

export default hot(Application);
