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

  addItem = (name) => {
    axios.post('/api/cars', { name })
      .then( res => {
        const { cars } = this.state;
        this.setState({ cars: [...cars, res.data] });
      })
   }

   updateCar = (id) => {
    axios.put(`/api/cars/${id}`)
      .then( res => {
        const cars = this.state.cars.map( c => {
        if (c.id === id)
          return res.data;
        return c;
      });
      this.setState({ cars });
    })
   }

   deleteCar = (id) => {
    axios.delete(`/api/cars/${id}`)
      .then( res => {
        const { cars } = this.state;
        this.setState({ cars: cars.filter(c => c.id !== id) })
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