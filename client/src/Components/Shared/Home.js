import React, { Component } from 'react';

class Home extends Component {

  componentDidMount() {
    console.log(this.props)
  }

  render(){ 
    return(
      <div>
        <h1>Digital Glovebox</h1>
      </div>
    )
  }
}

export default Home;