import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 20vw;
  align-items: center;
  justify-content: center;
`;

const NotFound: React.FC = () => <Wrapper>404</Wrapper>;

export default NotFound;
