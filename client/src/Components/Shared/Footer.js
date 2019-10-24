import React from 'react';
import { Link, withRouter, } from 'react-router-dom';
import styled from 'styled-components'

const FooterStyle  = styled.div`
  background: #1C2226;
  color: #ffffff;
  position: fixed;
  text-align: center;
  bottom: 5;
  height: 100%;
  width: 100%;
  padding-top: 10%;`

class Footer extends React.Component {
  render(){
    return(
      <FooterStyle>© 2019 DevPoint Studio LLC</FooterStyle>
    )
  }
}

export default Footer;