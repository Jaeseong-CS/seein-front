import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';

import Card, { CardProps } from '../components/Card';

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1440px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 2.5rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
`;

const Home: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const page = useRef<number>(1);
  const scrollCheck = useRef<boolean>(false);
  const poemList = useRef<CardProps[][]>([]);
  const count = useRef<number>(0);
  const [columnList, setColumnList] = useState<CardProps[][]>([]);

  const addPoem = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/card/${page.current}`);
      if (res.status === StatusCodes.OK) {
        if (page.current > res.data.pagination.totalPages) {
          return;
        }
        const width = Number.parseFloat(getComputedStyle(container.current!).width.split('px')[0]);
        if (width <= 887) {
          poemList.current = [
            poemList.current.length > 0 ? poemList.current[0].concat(res.data.data) : res.data.data,
          ];
        } else if (width <= 1330) {
          const length = res.data.data.length / 2;
          poemList.current = [
            poemList.current.length > 0
              ? poemList.current[0].concat(res.data.data.slice(0, length))
              : res.data.data.slice(0, length),
            poemList.current.length > 1
              ? poemList.current[1].concat(res.data.data.slice(length))
              : res.data.data.slice(length),
          ];
        } else {
          const length = res.data.data.length / 3;
          poemList.current = [
            poemList.current.length > 0
              ? poemList.current[0].concat(res.data.data.slice(0, length))
              : res.data.data.slice(0, length),
            poemList.current.length > 1
              ? poemList.current[1].concat(res.data.data.slice(length, length * 2))
              : res.data.data.slice(length, length * 2),
            poemList.current.length > 2
              ? poemList.current[2].concat(res.data.data.slice(length * 2))
              : res.data.data.slice(length * 2),
          ];
        }
        setColumnList(poemList.current);
      }
      page.current += 1;
    } catch (err) {
      setColumnList([]);
    }
  };

  const scrollPoem = useCallback(async () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (winScroll / height >= 0.5) {
      if (!scrollCheck.current) {
        scrollCheck.current = true;
        await addPoem();
        scrollCheck.current = false;
      }
    }
  }, []);

  const resizePoem = () => {
    try {
      const width = Number.parseFloat(getComputedStyle(container.current!).width.split('px')[0]);
      if (width <= 887) {
        switch (count.current) {
          case 2:
            poemList.current[0].splice(1, 0, ...poemList.current[1]);
            poemList.current = [poemList.current[0]];
            break;
          case 3:
            poemList.current[0].splice(1, 0, ...poemList.current[1], ...poemList.current[2]);
            poemList.current = [poemList.current[0]];
            break;
          default:
            break;
        }
        count.current = 1;
      } else if (width <= 1330) {
        switch (count.current) {
          case 1:
            {
              const length = poemList.current[0].length / 2;
              const temp = poemList.current[0].splice(1, length);
              poemList.current = [poemList.current[0], temp];
            }
            break;
          case 3:
            {
              const length = poemList.current[2].length / 2;
              const temp1 = poemList.current[2].slice(0, length);
              const temp2 = poemList.current[2].slice(length);
              poemList.current[0].splice(1, 0, ...temp1);
              poemList.current[1].splice(1, 0, ...temp2);
              poemList.current = [poemList.current[0], poemList.current[1]];
            }
            break;
          default:
            break;
        }
        count.current = 2;
      } else {
        switch (count.current) {
          case 1:
            {
              const length = poemList.current[0].length / 3;
              const temp1 = poemList.current[0].splice(1, length);
              const temp2 = poemList.current[0].splice(1, length);
              poemList.current = [poemList.current[0], temp1, temp2];
            }
            break;
          case 2:
            {
              const length = (poemList.current[0].length + poemList.current[1].length) / 6;
              const temp1 = poemList.current[0].splice(1, length);
              const temp2 = poemList.current[1].splice(1, length);
              poemList.current = [poemList.current[0], poemList.current[1], temp1.concat(temp2)];
            }
            break;
          default:
            break;
        }
        count.current = 3;
      }
    } finally {
      setColumnList(poemList.current);
    }
  };

  useEffect(() => {
    addPoem();
    window.removeEventListener('resize', resizePoem);
    window.removeEventListener('scroll', scrollPoem);
    window.addEventListener('resize', resizePoem);
    window.addEventListener('scroll', scrollPoem);
  }, [scrollPoem]);

  return (
    <>
      <Container ref={container}>
        {columnList.map((column) => (
          <Column>
            {column.map((cardProps) => (
              <Card {...cardProps} />
            ))}
          </Column>
        ))}
      </Container>
    </>
  );
};

export default Home;
