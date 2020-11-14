import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import Navigation from './components/Navigation';
import Auth from './pages/Auth';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignOut from './pages/SignOut';
import Write from './pages/Write';

const Container = styled.div`
  .fade-enter {
    opacity: 0;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 150ms ease-out 300ms;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 150ms ease-out;
  }

  div.transitionGroup {
    position: relative;
  }

  section.routeSection {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding-top: 4rem;
    padding-bottom: 1rem;

    @media screen and (max-width: 1024px) {
      padding-top: 0;
    }
  }
`;

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <Navigation />
      <TransitionGroup className="transitionGroup">
        <CSSTransition key={location.key} timeout={{ enter: 450, exit: 150 }} classNames="fade">
          <section className="routeSection">
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route path="/write" component={Write} />
              <Route path="/auth" component={Auth} />
              <Route path="/signout" component={SignOut} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </Container>
  );
};

export default Router;
