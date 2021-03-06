import React, { Component } from 'react';
import CarItem from './CarItem';

 class CarList extends Component {
  state = { loading: false }

  toggleLoading = () => {
    this.setState({ loading: true })
  } 

  render() {
      if ( this.props.cars || (this.props.cars && this.state.loading === true)) {
        return (
          <div>
              { this.props.cars.map( car => 
                <CarItem key={car.id} car={car} deleteCar={this.props.deleteCar} updateCar={this.props.updateCar} toggleEditing={this.props.toggleEditing} editing={this.props.editing} toggleLoading={this.toggleLoading}/>
                )
              }
            </div>
          )
        } else {
          return (
            <p>Loading...</p>
          )
      }
    }
  }

  export default CarList;