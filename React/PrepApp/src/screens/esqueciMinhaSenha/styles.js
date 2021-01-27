import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   /* align-items: center; */
`;

export const divRedefinicaoSenha = {
   marginBottom: '5%',
};
export const divConteudo = {
   marginBottom: '3%',
};

export const redefinicaoSenha = {
   textAlign: 'center',
   fontFamily: 'Roboto',
   fontSize: '20px',
   letterSpacing: 0,
   color: '#78909C',
   opacity: 1,
   maginBottom: '100px',
};
export const conteudo = {
   textAlign: 'center',
   fontFamily: 'Roboto',
   fontSize: '16px',
   letterSpacing: 0,
   color: '#78909C',
   opacity: 1,
};
export const labelEmail = {
   textAlign: 'left',
   paddingLeft: '7%',
   margin: '0 0 5% 0',
   color: '#78909C',
   fontSize: '16px',
   fontFamily: 'Roboto',
};
export const fieldEmail = {
   border: 'solid 1px #78909C',
   opacity: 1,
   background: '#FFFFFF 0% 0% no-repeat padding-box',
   width: '100%',
};

export const btnEnviar = {
   backgroundColor: '#3796F6',
   margin: '10% auto',
   width: '35%',
};

export const error = {
   textAlign: 'center',
   paddingLeft: '7%',
   marginTop: '4px',
   // color: '#78909C',
   fontSize: '14px',
   paddingRight: '4.5%',
   fontFamily: 'Roboto',
   color: '#00B33F',
};

export const Content = styled.div`
   width: 100%;
   max-width: 460px;
   background: #fff;
   text-align: center;
   border-radius: 4px;

   img {
      margin-top: 50px;
   }

   form {
      display: flex;
      flex-direction: column;
      margin-top: 25px;

      strong {
         text-align: left !important;
         margin-top: 20px;
         margin-left: 30px;
         line-height: 19px;
      }

      input {
         margin: 5px 30px 0 30px;
         background-color: #ffffff;
         border: solid 1px #dddddd;
         border-radius: 4px;
         height: 45px;
         padding: 0 15px;

         &::placeholder {
            color: #999;
            font-size: 16px;
         }
      }

      span {
         color: #ee4d64;
         align-self: flex-start;
         margin: 5px 0 0 30px;
      }

      button {
         margin: 30px 30px 50px 30px;
         height: 45px;
         font-size: 16px;
         font-weight: bold;
         color: #fff;
         background-color: ${colors.btnPrimary};
         border-radius: 4px;
         border: 0;
         transition: background 0.2s;

         &:hover {
            background: ${darken(0.04, `${colors.btnSecondary}`)};
         }
      }
   }
`;
