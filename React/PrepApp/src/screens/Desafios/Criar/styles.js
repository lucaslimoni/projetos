import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'wrap',
    minWidth: 800,
    maxWidth: 1280,
    padding: '2px 4px',
    marginTop: '3%',
    justifyContent: 'space-between',
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'wrap',
    width: '100%',
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

export const classes = {
  root: {
    display: 'flex',
    padding: '2px 4px',
    marginTop: '3%',
    // width: '80.5%',
    // minWidth: 990,
    placeContent: 'center',
  },
  divInputbuscar: {
    paddingTop: '10%',
  },
  inputBuscar: {
    paddingLeft: '10px',
    width: '290px',
    height: '50px',
    marginTop: '5%',
    borderRadius: 5,
    borderShadow: 0,
  },
  divBtnCriar: {
    width: '15%',
    height: '50px',
    margin: '1% 0.5% 0.5% 4%',
  },
  btnCriar: {
    width: '100%',
    height: '100%',
    margin: '2%',
    backgroundColor: '#3796F6',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: '18px',
    borderRadius: 5,
  },
  input: {
    paddingLeft: '10px',
    marginTop: '10%',
    height: '50px',
  },
  iconButton: {
    padding: 10,
  },
  select: {
    color: '#3796F6',
  },
  containerDivButtoms: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
};

export const Title = styled.span`
  display: flex;
  flex: 1;
  align-self: flex-start;
  margin-left: 20%;
  margin-bottom: -2%;
  font-family: 'Roboto';
  font-size: 18px;
  color: #777;
  text-transform: uppercase;
`;
