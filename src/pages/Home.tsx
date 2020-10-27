import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';

import Card, { ICardProps } from '../components/Card';

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1520px;
`;

const Home: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const poetryList = [
    {
      title: '김초록',
      writer: '레네베베',
      content: `그대는 어디있는가
아직도 미련이 남은 감재우

나의 슬픔이 넘쳐흘러
외로운 산 강물을 적시구나

나의 임이여 그대는 날 떠났는가
슬프고도 외롭구나`,
      dateCreated: new Date(2020, 7, 15, 13),
    },
    {
      title: '족쇄',
      writer: 'effortfull',
      content: `그토록 나를 세차게 조여왔던
족쇄가 이제는 풀렸다!

나를 가두었던 쇠사슬을
용광로에 던져 뜨겁게 녹여버리지!

가슴 깊이 사무치던 한을
거칠게 사그려뜨려 없애버리고
빈자리를 새로운 아침의 감정으로 가득 채우지!

쓰지 못했던 날개를 자랑스럽게 펼치어
힘껏 휘저이 구름 위를 마음껏 날아가 보자!

매일 같이 낮과 밤이 흘렀지만
이제야 진실로 맑은 아침을 맞는구나!

그토록 나를 세차게 조여왔던 족쇄
족쇄가 이제는 풀렸다!`,
      dateCreated: new Date(2020, 7, 29, 0),
    },
    {
      title: '장군님과 백마',
      writer: '리SIN',
      content: `동해번쩍 서해번쩍
두 신을 쥐락 펴락
장군님 타신다

수령님이 애용하신 그 말
오늘은 장군님 타신다

백두의 명마
신묘한 명마
장군님 타신다`,
      dateCreated: new Date(2020, 7, 17, 19),
    },
    {
      title: '숨어 있는',
      writer: '토中딱',
      content: `숨어 있는
감추는
고두준은 누구일까

하지만 그의 순수함과
504호에서 함께한

또 다른 '그'

불쾌함은
쾌락으로 이어지고

"아!"
메아리처럼 울려 퍼지는 경쾌한 소리
-학봉점 中`,
      dateCreated: new Date(2020, 7, 15, 13),
    },
    {
      title: '쩡짜이예',
      writer: '토中딱',
      content: `"야 쩡짜이예"
왜 울고 있는 거야


'..............'


"소난다"

넣을게


'씨....'

화난 척 하기는
사실 너도 이게 좋은 거잖아

-야 꿀벌 중에서 발췌`,
      dateCreated: new Date(2020, 7, 8, 19),
    },
    {
      title: '거울을 보다',
      writer: '돌댕댕이',
      content: `나를 보기 위해
방에 거울을 하나 장만했다

하는 일마다 비추어보고
나를 알아가야지

밥 먹을 때 나는
왼손으로 젓가락질을 아주 잘한다

그림을 그릴 때 나는
왼손으로 크로키를 한다

아 나는 왼손잡이구나!
그때 깨닫고는

오른손으로 펜을 잡아 곧바로 옮겨적는다

"나는 왼손잡이다"`,
      dateCreated: new Date(2020, 7, 15, 16),
    },
    {
      title: '여름 밤, 심야 자습',
      writer: 'FJEY',
      content: `고요, 그리고 적막
마침내 찬란히 깨지다

한 계단 밟고 올라서는
나의 마음은 이미 저 건너

심야,
불화의 시간
여름밤 별빛이 되어
사라져라

스신한 바람
건듯 불어오면
포근한 아침 햇살을 맞을테니`,
      dateCreated: new Date(2020, 7, 10, 2),
    },
  ];
  const [columnList, setColumnList] = useState<ICardProps[][]>();
  const count = useRef<number>(0);

  const set = useCallback(() => {
    const width = Number.parseFloat(getComputedStyle(container.current!).width.split('px')[0]);
    if (width <= 1330) {
      if (count.current === 0 || count.current !== 2) {
        const length = poetryList.length / 2;
        setColumnList([poetryList.slice(length), poetryList.slice(0, length)]);
      }
      count.current = 2;
    } else if (width <= 887) {
      if (count.current === 0 || count.current !== 1) {
        setColumnList([poetryList]);
      }
      count.current = 1;
    } else {
      if (count.current === 0 || count.current !== 3) {
        const length = poetryList.length / 3;
        setColumnList([
          poetryList.slice(length * 2),
          poetryList.slice(length, length * 2),
          poetryList.slice(0, length),
        ]);
      }
      count.current = 3;
    }
  }, [poetryList]);

  useEffect(() => {
    set();
    window.removeEventListener('resize', set);
    window.addEventListener('resize', set);
  }, [set]);

  return (
    <>
      <Container ref={container}>
        {columnList?.map((column) => (
          <Column>
            {column.map(({
              title, writer, content, dateCreated,
            }) => (
              <Card title={title} writer={writer} content={content} dateCreated={dateCreated} />
            ))}
          </Column>
        ))}
      </Container>
    </>
  );
};

export default Home;
