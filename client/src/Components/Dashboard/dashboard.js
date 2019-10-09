import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom'; 
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';

class Dashboard extends Component {
  state = { cars: []};


  componentDidMount() {
    const { auth: { user } } = this.props;
    axios.get(`/api/${user.id}/cars`)
      .then( res => {
        this.setState({ cars: res.data, });
      })
      .catch( err => {
        console.log(err);
      })
  }

  render() {
    const { cars } = this.state;
      return (
          <ol>
           { cars.map( c =>
               <li key={c.id}>{c.make} {c.model}></li>
             )
           }
         </ol>
       )
     }
  }

export class ConnectedDashboard extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Dashboard { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedDashboard);