import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom'; 
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import CarList from '../Cars/CarList';
import CarForm from '../Cars/CarForm';

class Dashboard extends Component {
  state = { cars: [], adding: false, editing: false};

  componentDidMount() {
    const { auth: { user } } = this.props;
    if(user) {
      axios.get(`/api/users/${user.id}/cars`)
      .then( res => {
        this.setState({cars: res.data})
      })
      .catch( res => {
        console.log(res)
      })
    }
  }

  toggleAdding = () => {
    this.setState({adding: !this.state.adding})
  }

  toggleEditing = () => {
    this.setState({editing: !this.state.editing})
  }

  addItem = (car) => {
    const { auth: { user } } = this.props;
    axios.post(`/api/users/${user.id}/cars`, { car })
      .then( res => {
        const { cars } = this.state;
        this.setState({ cars: [...cars, res.data] });
      })
   }

   updateCar = (id, car) => {
    const { auth: { user } } = this.props;
    axios.put(`/api/users/${user.id}/cars/${id}`, {car})
      .then( res => {
        const { cars } = this.state.cars.map( c => {
          if (c.id === id)
            return res.data;
          return c;
        });
        this.setState({ cars });
    })
   }

   deleteCar = (id) => {
    const { auth: { user } } = this.props;
    axios.delete(`/api/users/${user.id}/cars/${id}`)
      .then( res => {
        const { cars } = this.state;
        this.setState({ cars: cars.filter(c => c.id !== id) })
      })
   }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleAdding()}>Add</button>
        <CarList cars={this.state.cars} deleteCar={this.deleteCar} updateCar={this.updateCar} toggleEditing={this.toggleEditing} editing={this.state.editing}/>
        {
          this.state.adding ? <CarForm add={this.addItem} toggleAdd={this.toggleAdding}/> : null
        }
    
      </div>
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