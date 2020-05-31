import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Application from './components/Application';
import { Colors } from './utils/base';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const html = document.getElementsByTagName('HTML')[0] as HTMLElement;

const htmlStyles = {
    background: Colors.DARK_GRAY,
    boxSizing: 'border-box',
    height: '100%',
    padding: '22px'
};

const bodyStyles = {
    color: '#FFF',
    margin: '0',
    height: '100%'
};

Object.assign(html.style, htmlStyles);
Object.assign(document.body.style, bodyStyles);

const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        mainElement
    );
};

render(Application);
