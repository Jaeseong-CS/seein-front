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
    background-color: #ffffff;
    box-shadow: 0 0 12px 0 #0000005a;
    width: 100%;
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
    flex: 3 3 calc(100% / 3);
    text-align: center;
  }
`;

const LinkEx = styled(Link)<{ current: boolean }>`
  display: block;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ current }) => (current ? '#5b3f40' : '#aaaaaa')};
  transition: 0.3s ease-out;

  &:hover {
    color: #5b3f40;
  }

  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
    height: 2.2rem;
    line-height: 2.2rem;
  }
`;

const Navigation: React.FC = () => {
  const [token, setToken] = useState(undefined);
  const location = useLocation();
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tokenCheck = async () => {
      setToken(await Cookies.load('accessToken'));
    };

    tokenCheck();
  });

  useEffect(() => {
    const navigationStyle = () => {
      if (wrapper.current) {
        if (Number.parseFloat(getComputedStyle(wrapper.current).width.split('px')[0]) >= 1024) {
          const winScroll = document.documentElement.scrollTop;
          if (winScroll !== 0) {
            wrapper.current!.style.backgroundColor = '#ffffff';
            wrapper.current!.style.boxShadow = '0 0 12px 0 #0000005a';
          } else {
            wrapper.current!.style.backgroundColor = 'transparent';
            wrapper.current!.style.boxShadow = 'none';
          }
        } else {
          wrapper.current!.style.backgroundColor = '#ffffff';
          wrapper.current!.style.boxShadow = '0 0 12px 0 #0000005a';
        }
      } else {
        wrapper.current!.style.backgroundColor = '#ffffff';
        wrapper.current!.style.boxShadow = '0 0 12px 0 #0000005a';
      }
    };

    window.removeEventListener('scroll', navigationStyle);
    window.removeEventListener('resize', navigationStyle);
    window.addEventListener('scroll', navigationStyle);
    window.addEventListener('resize', navigationStyle);
  });

  return (
    <Wrapper ref={wrapper}>
      <Container>
        <Item>
          <LinkEx to="/" current={location.pathname === '/'}>
            시집
          </LinkEx>
        </Item>
        <Item>
          <LinkEx to="/write" current={location.pathname === '/write'}>
            작성
          </LinkEx>
        </Item>
        <Item>
          {token ? (
            <LinkEx to="/signout" current={location.pathname === '/signout'}>
              로그아웃
            </LinkEx>
          ) : (
            <LinkEx to="/account" current={location.pathname === '/account'}>
              계정
            </LinkEx>
          )}
        </Item>
      </Container>
    </Wrapper>
  );
};
export default Navigation;
