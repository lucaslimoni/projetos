import React from 'react';
import { Wrapper, Title, Container } from './styles';

export default function ContentBody({ children, title }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>{children}</Container>
    </Wrapper>
  );
}
