import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom'; 
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import CarItem from './CarItem';

 class CarList extends Component {

  render() {
      return (
          <div>
           { this.props.cars.map( car => 
             <CarItem car={car} deleteCar={this.props.deleteCar} updateCar={this.props.updateCar}/>
             )
           }
         </div>
       )
     }
  }

  export default CarList;