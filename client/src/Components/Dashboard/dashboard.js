import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom'; 
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import CarList from '../Cars/CarList';

class Dashboard extends Component {
  state = { cars: []};

  componentDidMount() {
    const { auth: { user } } = this.props;
    axios.get(`/api/users/${user.id}/cars`)
      .then( res => {
        this.setState({cars: res.data})
      })
      .catch( res => {
        console.log(res)
      })
  }

  render() {
    return (
      <CarList cars={this.state.cars} />
       );
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