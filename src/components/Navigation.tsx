import React, { useEffect, useState } from 'react';
import Cookies from 'react-cookies';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationWrapper = styled.div`
  position: sticky;
  display: flex;
  z-index: 999;
  justify-content: center;
  width: 100vw;
`;

const NavigationContainer = styled.ul`
  list-style-type: none;
`;

const NavigationItem = styled.li`
  float: left;
  padding: 0.6em;
  margin-left: 1.7em;
  margin-right: 1.7em;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  font-size: 1.3em;
`;

const Navigation: React.FC = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenCheck = async () => {
      setToken(await Cookies.load('accessToken'));
    };

    tokenCheck();
  }, [token]);

  return (
    <NavigationWrapper>
      <NavigationContainer>
        <NavigationItem>
          <NavigationLink to="/">메인</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          {token ? (
            <NavigationLink to="/signout">로그아웃</NavigationLink>
          ) : (
            <NavigationLink to="/signin">로그인</NavigationLink>
          )}
        </NavigationItem>
        <NavigationItem>
          {token ? (
            <NavigationLink to="/write">글쓰기</NavigationLink>
          ) : (
            <NavigationLink to="/signup">회원가입</NavigationLink>
          )}
        </NavigationItem>
      </NavigationContainer>
    </NavigationWrapper>
  );
};
export default Navigation;
