import './styles/global.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import Intro from './components/Intro';
import Router from './Router';

const Wrapper = styled(BrowserRouter)`
  flex: 1 0 auto;
  padding-bottom: 20px;
`;

const App: React.FC = () => (
  <>
    <Intro />
    <Wrapper>
      <Router />
    </Wrapper>
  </>
);

export default App;
