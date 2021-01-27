import styled from 'styled-components';
import '../../assets/fontes.css';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  flex: 2;
  background-color: #fff;
`;

export const Logo = styled.span`
  font-family: DaxLinePro;
  font-size: 28px;
  color: white;
  position: absolute;
  display: inline-block;
  margin: auto 0px auto 0px;
  top: 50%;
  margin-top: -18px;
  margin-left: 40px;
`;

export const TextSpan = styled.span`
  vertical-align: middle;
  display: inline-block;
  margin-left: 5px;
  text-transform: uppercase;
`;

export const imgStyle = {
  width: '30px',
  height: 'auto',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const sideStyle = styled.div`
  background-color: #fff;
`;

export const PrepAppTextStyle2 = {
  marginBottom: '10%',
  fontFamily: 'DaxLinePro',
  fontSize: '40px',
  color: '#fa4c06',
  marginLeft: '120%',
};

export const menuStyle = {
  marginLeft: '30%',
};
