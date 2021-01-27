import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

export const Content = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 16px 24px;
`;

export const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 800px
  background-color: #fff;
`;

export const NavWapper = styled.div`
  flex: 1;
  min-width: 64px;
  max-width: 64px;
  min-height: 100%;
  position: relative;
`;
