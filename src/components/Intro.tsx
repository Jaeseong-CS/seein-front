import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'react-cookies';
import styled, { keyframes } from 'styled-components';

const IntroBackgroundAnimation = keyframes`
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

const IntroWrapperAnimation = keyframes`
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

const IntroBackground = styled.div`
  position: absolute;
  z-index: 9999;
  animation: ${IntroBackgroundAnimation} 2.6s both ease-in-out;
`;

const IntroWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: ${IntroWrapperAnimation} 2.6s both ease-in-out;
`;

const IntroTitle = styled.div`
  font-size: 5.8vw;

  @media screen and (max-width: 960px) {
    font-size: 11.4vw;
  }
`;

const IntroSub = styled.div`
  font-size: 1.8vw;

  @media screen and (max-width: 960px) {
    font-size: 4.7vw;
  }
`;

const IntroMessage = styled.div`
  font-size: 2.8vw;

  @media screen and (max-width: 960px) {
    font-size: 5.5vw;
  }
`;

const Intro: React.FC = () => {
  const [intro, setIntro] = useState(false);
  const introWrapper = useRef<HTMLDivElement>(null);

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
    introWrapper.current!.addEventListener('animationend', () => {
      setIntro(true);
    });
  }, [introWrapper]);

  return (
    <>
      {!intro && (
        <IntroBackground ref={introWrapper}>
          <IntroWrapper>
            <IntroTitle>시인</IntroTitle>
            <IntroSub>See In</IntroSub>
            <IntroMessage>시인은 사물을 보는 것 - 김영하</IntroMessage>
          </IntroWrapper>
        </IntroBackground>
      )}
    </>
  );
};

export default Intro;
