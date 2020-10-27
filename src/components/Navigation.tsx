import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'react-cookies';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const Container = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;

  @media screen and (max-width: 1024px) {
    flex: 3 3 auto;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Item = styled.li`
  float: left;
  margin-left: 1.4rem;
  margin-right: 1.4rem;

  @media screen and (max-width: 1024px) {
    margin: 0;
    flex: 3 3 calc(100vh / 3);
    text-align: center;
  }
`;

const LinkEx = styled(Link)<{ current: boolean }>`
  display: block;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ current }) => (current ? '#1a1a1a' : '#8a8a8a')};
  transition: 0.3s ease-out;

  &:hover {
    color: #1a1a1a;
  }

  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
    height: 2.2rem;
    line-height: 2.2rem;
  }
`;

const Navigation: React.FC = () => {
  const [token, setToken] = useState('');
  const location = useLocation();
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tokenCheck = async () => {
      setToken(await Cookies.load('accessToken'));
    };

    tokenCheck();
  }, [token]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (Number.parseFloat(getComputedStyle(wrapper.current!).width.split('px')[0]) >= 1024) {
        const winScroll = document.documentElement.scrollTop;
        if (winScroll !== 0) {
          wrapper.current!.style.backgroundColor = '#ffffff';
          wrapper.current!.style.boxShadow = '0 0 12px 0 #0000005a';
        } else {
          wrapper.current!.style.backgroundColor = 'transparent';
          wrapper.current!.style.boxShadow = 'none';
        }
      }
    });
  });

  return (
    <Wrapper ref={wrapper}>
      <Container>
        <Item>
          <LinkEx to="/" current={location.pathname === '/'}>
            홈
          </LinkEx>
        </Item>
        <Item>
          {token ? (
            <LinkEx to="/signout" current={location.pathname === '/signout'}>
              로그아웃
            </LinkEx>
          ) : (
            <LinkEx to="/signin" current={location.pathname === '/signin'}>
              로그인
            </LinkEx>
          )}
        </Item>
        <Item>
          {token ? (
            <LinkEx to="/write" current={location.pathname === '/write'}>
              글쓰기
            </LinkEx>
          ) : (
            <LinkEx to="/signup" current={location.pathname === '/signup'}>
              회원가입
            </LinkEx>
          )}
        </Item>
      </Container>
    </Wrapper>
  );
};
export default Navigation;
