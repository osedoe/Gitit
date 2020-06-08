import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import { Home, Login } from '../pages';
import { Colors } from '../utils/base';
import { Navigation } from './Navigation';
import { DragBar } from './DragBar';
import { NotificationList } from '../pages/NotificationList';

const Container = styled.div`
    background: ${Colors.DARK_GRAY};
`;

const Application = () => {
    return (
        <Router>
            <DragBar/>
            <Navigation/>
            <Container>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/notifications">
                        <NotificationList/>
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
