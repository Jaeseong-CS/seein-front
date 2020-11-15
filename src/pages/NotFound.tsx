import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.span`
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 20vw;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NotFound: React.FC = () => {
  const history = useHistory();

  const home = () => {
    history.push('/');
  };

  return (
    <Container>
      404
      <Button variant="contained" disableElevation onClick={home}>홈</Button>
    </Container>
  );
};

export default NotFound;
