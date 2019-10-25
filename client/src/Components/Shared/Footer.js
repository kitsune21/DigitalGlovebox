import React from 'react';
import styled from 'styled-components'

const FooterStyle  = styled.div`
  background-color: #1C2226;
  color: #ffffff;
  padding: 15px;
  position: relative;
  bottom: 0;
  width: 100%;
  text-align: center;`

class Footer extends React.Component {
  render(){
    return(
      <FooterStyle>©2019 DevPoint Studio LLC</FooterStyle>
    )
  }
}

export default Footer;