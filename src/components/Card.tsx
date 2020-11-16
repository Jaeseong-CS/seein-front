import React from 'react';
import styled from 'styled-components';

export type CardProps = {
  title: string;
  writer: string;
  content: string;
  createdAt: string;
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 13rem;
  border: 1px solid #ededf0;
  box-shadow: 12px 12px 12px #0000000a;
  background-color: #ffffff;
  margin: 1rem 0.4rem;
  border-radius: 8px;

  @media screen and (max-width: 1024px) {
    margin: 1rem 0 0.4rem 0;
    border-radius: 0;
  }
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

const CreatedAt = styled.div`
  margin: 1.3rem auto;
  font-size: 0.55rem;
`;

const Card: React.FC<CardProps> = ({
  title, writer, content, createdAt,
}: CardProps) => (
  <Container>
    <Title>{title}</Title>
    <Writer>{writer}</Writer>
    <Content>{content}</Content>
    <CreatedAt>{new Date(createdAt).toDateString()}</CreatedAt>
  </Container>
);

export default Card;
