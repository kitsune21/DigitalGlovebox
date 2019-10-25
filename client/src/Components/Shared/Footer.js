import React from 'react';
import styled from 'styled-components'

const FooterStyle  = styled.div`
  background: #1C2226;
  color: #ffffff;
  text-align: center;
  vertical-align: bottom;
  position: relative;
  padding: 30px 50px;
  clear: both;`


class Footer extends React.Component {
  render(){
    return(
      <FooterStyle>©2019 DevPoint Studio LLC</FooterStyle>
    )
  }
}

export default Footer;