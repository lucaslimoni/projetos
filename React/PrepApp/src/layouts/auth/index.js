import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content, ContainerImage, PrepAppTextStyle } from './styles';

import Grid from '@material-ui/core/Grid';

export default class AuthLayout extends Component {
   constructor() {
      super();
      this.state = {};
   }

   render() {
      const { children } = this.props;
      return (
         <Wrapper>
            <ContainerImage>
               <div>
                  <Grid container spacing={3}>
                     <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                     >
                        <strong style={PrepAppTextStyle}>PrepApp</strong>
                     </Grid>
                  </Grid>
               </div>
            </ContainerImage>
            <Content>{children}</Content>
         </Wrapper>
      );
   }
}

AuthLayout.propTypes = {
   children: PropTypes.element.isRequired,
};
