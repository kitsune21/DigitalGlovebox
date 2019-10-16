import React, { Component } from 'react';
import CarItem from './CarItem';

 class CarList extends Component {

  render() {
      return (
          <div>
           { this.props.cars.map( car => 
             <CarItem key={car.id} car={car} deleteCar={this.props.deleteCar} updateCar={this.props.updateCar}/>
             )
           }
         </div>
       )
     }
  }

  export default CarList;