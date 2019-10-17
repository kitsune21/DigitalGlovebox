import React, { Component } from 'react';
import ConnectedDashboard from '../Dashboard/dashboard';
class Home extends Component {

  componentDidMount() {

  }

  render(){
    return(
      <div>
        <h1>Digital Glovebox</h1>
        <ConnectedDashboard />
      </div>
    )
  }
}

export default Home;
