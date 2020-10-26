import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ScrollBarWrapper = styled.div`
  position: fixed;
  width: 0.3em;
  height: calc(100vh - 2.2em);
  top: 2.2em;
  right: 0;
  z-index: 99;
  opacity: 0.7;
  transition: 0.5s ease-out;
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

  useEffect(() => {
    let timer = 0;

    const setScrollBar = () => {
      timer += 1;
      scrollBarWrapper.current!.style.opacity = '0.7';
      const element = document.documentElement;
      const wScroll = element.scrollTop / 3;
      const wHeight = (element.scrollHeight - element.clientHeight) / 3;
      scrollBarIndicator.current!.style.top = `calc(${wScroll}px + 2.2em)`;
      scrollBarIndicator.current!.style.height = `calc(${
        (1 - wHeight / element.clientHeight) * 100
      }vh - 2.2em)`;
      ((t) => {
        setTimeout(() => {
          if (timer === t) {
            scrollBarWrapper.current!.style.opacity = '0';
          }
        }, 1000);
      })(timer);
    };

    window.addEventListener('scroll', setScrollBar);
    window.addEventListener('resize', setScrollBar);
  }, []);

  const mouseMove = (e: MouseEvent) => {
    document.documentElement.scrollTop += e.movementY * 3;
  };

  return (
    <ScrollBarWrapper
      onMouseEnter={() => {
        scrollBarWrapper.current!.style.opacity = '0.7';
      }}
      onMouseLeave={() => {
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
