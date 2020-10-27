import React from 'react';
import styled from 'styled-components';

export interface ICardProps {
  title: string;
  writer: string;
  content: string;
  dateCreated: Date;
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 13rem;
  // border: 1px solid #ededf0;
  box-shadow: 12px 12px 12px #0000000a;
  background-color: #ffffff;
  margin: 1em 0.4em;
`;

const Title = styled.div`
  margin: 1rem auto;
  font-weight: bold;
`;

const Writer = styled.div`
  margin: -1rem 2rem 0.5rem auto;
  font-size: 0.625rem;
`;

const Content = styled.div`
  white-space: pre-wrap;
  margin: 0 auto;
  font-size: 0.625rem;
`;

const DateCreated = styled.div`
  margin: 1.3rem auto;
  font-size: 0.55rem;
`;

const Card: React.FC<ICardProps> = ({
  title, writer, content, dateCreated,
}: ICardProps) => (
  <Container>
    <Title>{title}</Title>
    <Writer>{writer}</Writer>
    <Content>{content}</Content>
    <DateCreated>{dateCreated.toDateString()}</DateCreated>
  </Container>
);

export default Card;
