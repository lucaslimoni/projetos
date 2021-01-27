import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Desafios from 'screens/Desafios';
import { menuStyle, Logo } from './styles';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import history from '~/services/history';

import {
  faHome,
  faUsers,
  faCog,
  faCodeBranch,
  faBookOpen,
  faSchool,
  faPaste,
  faTasks,
  faFileArchive,
  faCloudDownloadAlt,
  faSignOutAlt,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons';

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function Sidebar(props) {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(signOut());
  }

  const colorRef = useRef(null);

  return (
    <SideNav
      style={{
        position: 'fixed',
        paddingTop: '10px',
        backgroundColor: '#fa4c06',
        display: 'flex',
        flex: 1,
        overflowX: 'hidden',
        flexDirection: 'column',
        minHeight: '100%',
      }}
      onSelect={selected => {
        const to = '/' + selected;
        if (window.location.pathname !== to) {
          history.push(to);
        }
      }}
    >
      <SideNav.Toggle>
        <Logo>PrepApp</Logo>
      </SideNav.Toggle>

      <SideNav.Nav defaultSelected="desafios">
        {/* <NavItem eventKey="home">
          <NavIcon style={{ color: '#fff' }}>
            <FontAwesomeIcon
              icon={faHome}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Home</NavText>
        </NavItem>
        <NavItem eventKey="configuracoes">
          <NavIcon>
            <FontAwesomeIcon
              icon={faCog}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Configurações</NavText>
          <NavItem eventKey="configuracoes/Grupos">
            <NavText>Grupos</NavText>
          </NavItem>
          <NavItem eventKey="configuracoes/Telas">
            <NavText>Telas</NavText>
          </NavItem>
          <NavItem eventKey="configuracoes/Permissoes">
            <NavText>Permissões</NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey="users">
          <NavIcon>
            <FontAwesomeIcon
              icon={faUsers}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Usuários</NavText>
        </NavItem>
        <NavItem eventKey="plano_estudos">
          <NavIcon>
            <FontAwesomeIcon
              icon={faCodeBranch}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Plano de estudos</NavText>
        </NavItem>
        <NavItem eventKey="disciplinas">
          <NavIcon>
            <FontAwesomeIcon
              icon={faBookOpen}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Disciplinas</NavText>
        </NavItem>
        <NavItem eventKey="instituicoes">
          <NavIcon>
            <FontAwesomeIcon
              icon={faSchool}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Instituições</NavText>
        </NavItem>
        <NavItem eventKey="simulados">
          <NavIcon>
            <FontAwesomeIcon
              icon={faPaste}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Simulados</NavText>
        </NavItem>
        <NavItem eventKey="questoes">
          <NavIcon>
            <FontAwesomeIcon
              icon={faTasks}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Questões</NavText>
        </NavItem> */}
        <NavItem eventKey="desafios">
          <NavIcon>
            <FontAwesomeIcon
              icon={faPuzzlePiece}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Desafios</NavText>
        </NavItem>
        {/* <NavItem eventKey="arquivos">
          <NavIcon>
            <FontAwesomeIcon
              icon={faFileArchive}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Arquivos</NavText>
        </NavItem>
        <NavItem eventKey="downloads">
          <NavIcon>
            <FontAwesomeIcon
              icon={faCloudDownloadAlt}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Downloads</NavText>
        </NavItem>
        */}
        <NavItem eventKey="" onClick={handleClick}>
          <NavIcon>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ fontSize: '1.75em', color: '#fff' }}
            />
          </NavIcon>
          <NavText style={menuStyle}>Sair</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

Desafios.propTypes = {
  children: PropTypes.element.isRequired,
};
