import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ScrollBarWrapper = styled.div`
  position: fixed;
  display: flex;
  width: 0.5em;
  height: calc(100vh - 2.2em);
  top: 2.2em;
  right: 0;
  z-index: 99;
  opacity: 0.7;
  transition: 0.5s ease-out;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const ScrollBarIndicator = styled.div`
  position: fixed;
  width: 0.3em;
  height: 0;
  background-color: #1a1a1a;
  border-radius: 0.15em;
  transition: 0.1s ease-out;
`;

const ScrollBar: React.FC = () => {
  const scrollBarWrapper = useRef<HTMLDivElement>(null);
  const scrollBarIndicator = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(true);

  useEffect(() => {
    let timer = 0;

    const setScrollBar = () => {
      timer += 1;
      scrollBarWrapper.current!.style.opacity = '0.7';
      const element = document.documentElement;
      const wScroll = element.scrollTop / 3;
      const wHeight = (element.scrollHeight - element.clientHeight) / 3;
      scrollBarIndicator.current!.style.top = `calc(${wScroll}px + 2.3em)`;
      scrollBarIndicator.current!.style.height = `calc(${
        (1 - wHeight / element.clientHeight) * 100
      }vh - 2.4em)`;
      ((t) => {
        setTimeout(() => {
          if (hover && timer === t) {
            scrollBarWrapper.current!.style.opacity = '0';
          }
        }, 500);
      })(timer);
    };

    window.addEventListener('load', setScrollBar);
    window.addEventListener('scroll', setScrollBar);
    window.addEventListener('resize', setScrollBar);
  }, [hover]);

  const mouseMove = (e: MouseEvent) => {
    document.documentElement.scrollTop += e.movementY * 3;
  };

  return (
    <ScrollBarWrapper
      onMouseEnter={() => {
        setHover(true);
        scrollBarWrapper.current!.style.opacity = '0.7';
      }}
      onMouseLeave={() => {
        setHover(false);
        scrollBarWrapper.current!.style.opacity = '0';
      }}
      ref={scrollBarWrapper}
    >
      <ScrollBarIndicator
        onMouseDown={(e) => {
          if (e.button === 0) {
            window.addEventListener('mouseup', () => {
              window.removeEventListener('mousemove', mouseMove);
            });
            window.addEventListener('mousemove', mouseMove);
          }
        }}
        ref={scrollBarIndicator}
      />
    </ScrollBarWrapper>
  );
};

export default ScrollBar;
