import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'react-cookies';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavigationWrapper = styled.div`
  position: fixed;
  display: flex;
  z-index: 999;
  justify-content: center;
  width: 100vw;
  transition: 0.3s ease-out;

  @media screen and (max-width: 1024px) {
    bottom: 0;
    background-color: #eadaff;
    box-shadow: none;
  }
`;

const NavigationContainer = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0.4em;
  padding-bottom: 0.4em;

  @media screen and (max-width: 1024px) {
    flex: 3 3 auto;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const NavigationItem = styled.li`
  float: left;
  margin-left: 1.4em;
  margin-right: 1.4em;

  @media screen and (max-width: 1024px) {
    margin: 0;
    flex: 3 3 calc(100vh / 3);
    text-align: center;
  }
`;

const NavigationLink = styled(Link)<{ current: boolean }>`
  display: block;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  color: ${({ current }) => (current ? '#1a1a1a' : '#8a8a8a')};
  transition: 0.3s ease-out;

  &:hover {
    color: #1a1a1a;
  }

  @media screen and (max-width: 1024px) {
    font-size: 0.8em;
    height: 2.2em;
    line-height: 2.2em;
  }
`;

const Navigation: React.FC = () => {
  const [token, setToken] = useState('');
  const location = useLocation();
  const navigationWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tokenCheck = async () => {
      setToken(await Cookies.load('accessToken'));
    };

    tokenCheck();
  }, [token]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      if (winScroll !== 0) {
        navigationWrapper.current!.style.backgroundColor = '#ffffff';
        navigationWrapper.current!.style.boxShadow = '0 0 12px 0 #0000005a';
      } else {
        navigationWrapper.current!.style.backgroundColor = 'transparent';
        navigationWrapper.current!.style.boxShadow = 'none';
      }
    });
  });

  return (
    <NavigationWrapper ref={navigationWrapper}>
      <NavigationContainer>
        <NavigationItem>
          <NavigationLink to="/" current={location.pathname === '/'}>
            홈
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          {token ? (
            <NavigationLink to="/signout" current={location.pathname === '/signout'}>
              로그아웃
            </NavigationLink>
          ) : (
            <NavigationLink to="/signin" current={location.pathname === '/signin'}>
              로그인
            </NavigationLink>
          )}
        </NavigationItem>
        <NavigationItem>
          {token ? (
            <NavigationLink to="/write" current={location.pathname === '/write'}>
              글쓰기
            </NavigationLink>
          ) : (
            <NavigationLink to="/signup" current={location.pathname === '/signup'}>
              회원가입
            </NavigationLink>
          )}
        </NavigationItem>
      </NavigationContainer>
    </NavigationWrapper>
  );
};
export default Navigation;
