import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  state = { cars: {}};


  componentDidMount() {
    axios.get(`/api/${currentUser}/cars`)
      .then( res => {
        this.setState({ cars: res.data, });
      })
      .catch( err => {
        console.log(err);
      })
  }

  render() {
    return(

    

    )
  }

}