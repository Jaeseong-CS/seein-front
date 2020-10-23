import React from 'react';
import {
  Route, Switch, useLocation,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import SignUp from './pages/SignUp';
import Write from './pages/Write';

const Wrapper = styled.div`
  .fade-enter {
    opacity: 0;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-in;
  }

  div.transitionGroup {
    position: relative;
  }

  section.routeSection {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <Navigation />
      <TransitionGroup className="transitionGroup">
        <CSSTransition key={location.key} timeout={{ enter: 300, exit: 309 }} classNames="fade">
          <section className="routeSection">
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route path="/write" component={Write} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signout" component={SignOut} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper>
  );
};

export default Router;
