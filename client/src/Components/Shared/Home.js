import React, { Component } from 'react';
import ConnectedDashboard from '../Dashboard/dashboard';
class Home extends Component {

  componentDidMount() {
    console.log(this.props)
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