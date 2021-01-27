import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Logo, Wrapper, List, Item, Text } from './styles';

export default function Navbar() {
  const user = useSelector(state => state.user.profile.name);
  return (
    <Wrapper>
      <Logo>PrepApp</Logo>
      <List>
        <Item>
          <Text>{user}</Text>
        </Item>
      </List>
    </Wrapper>
  );
}
