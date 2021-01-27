import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, NavWapper, Content, ContentWapper } from './styles';
import Sidebar from '~/components/Sidebar';
import Navbar from 'components/Navbar';

const MenuContext = React.createContext({ isOpen: false });

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <NavWapper>
        <Sidebar />
      </NavWapper>
      <Content>
        <ContentWapper>
          <Navbar />
          {children}
        </ContentWapper>
      </Content>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
