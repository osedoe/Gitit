import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Application from './Application';
import { Colors } from './utils';
import { LoginProvider } from './context/login/loginContext';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true
  });
}

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const html = document.getElementsByTagName('HTML')[0] as HTMLElement;

const htmlStyles = {
  background: Colors.WHITISH,
  boxSizing: 'border-box',
  height: '100%'
};

const bodyStyles = {
  background: `${Colors.DARK_GRAY}`,
  color: '#FFF',
  height: '100%',
  margin: '0'
};

Object.assign(html.style, htmlStyles);
Object.assign(document.body.style, bodyStyles);

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <LoginProvider>
        <Component/>
      </LoginProvider>
    </AppContainer>,
    mainElement
  );
};

render(Application);
