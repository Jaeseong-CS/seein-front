import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Intro from './components/Intro';
import Router from './Router';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Hi Melody';
    src: url(/HiMelody-Regular.woff2);
  }

  body,
  html {
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
  }

  * {
    color: #1a1a1a;
    font-size: 32px;
    font-family: 'Hi Melody';
    user-select:none;
  }
`;

const Wrapper = styled(BrowserRouter)`
  flex: 1 0 auto;
  padding-bottom: 20px;
`;

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Intro />
    <Wrapper>
      <Router />
    </Wrapper>
  </>
);

export default App;
