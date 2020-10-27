import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'react-cookies';
import styled, { keyframes } from 'styled-components';

const WrapperAnimation = keyframes`
  0% {
    opacity: 1;
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ContainerAnimation = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 9999;
  animation: ${WrapperAnimation} 2.6s both ease-in-out;
  background-color: #ffffff;
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: ${ContainerAnimation} 2.6s both ease-in-out;
`;

const Title = styled.div`
  font-size: 5.8vw;

  @media screen and (max-width: 1024px) {
    font-size: 11.4vw;
  }
`;

const SubTitle = styled.div`
  font-size: 2.3vw;

  @media screen and (max-width: 1024px) {
    font-size: 4.7vw;
  }
`;

const Message = styled.div`
  font-size: 2.8vw;

  @media screen and (max-width: 1024px) {
    font-size: 5.5vw;
  }
`;

const Intro: React.FC = () => {
  const [intro, setIntro] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncIntro = async () => {
      const temp: boolean = await Cookies.load('intro');
      setIntro(temp);
      if (!temp) {
        const expires = new Date();
        expires.setTime(Date.now() + 1000 * 60 * 60 * 24);
        Cookies.save('intro', 'true', { expires });
      }
    };

    syncIntro();
  }, []);

  useEffect(() => {
    wrapper.current!.addEventListener('animationend', () => {
      setIntro(true);
    });
  }, [wrapper]);

  return (
    <>
      {!intro && (
        <Wrapper ref={wrapper}>
          <Container>
            <Title>시인</Title>
            <SubTitle>See In</SubTitle>
            <Message>시인은 사물을 보는 것 - 김영하</Message>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default Intro;
