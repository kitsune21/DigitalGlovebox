import React from 'react';
import styled from 'styled-components'

const FooterStyle  = styled.div`
  background: #1C2226;
  color: #ffffff;
  // position: fixed;
  text-align: center;
  bottom: 5;
  height: 100%;`

class Footer extends React.Component {
  render(){
    return(
      <FooterStyle>©2019 DevPoint Studio LLC</FooterStyle>
    )
  }
}

export default Footer;