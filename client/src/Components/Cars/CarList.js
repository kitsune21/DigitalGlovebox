import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom'; 
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';

 class CarList extends Component {

  render() {
      return (
          <ol>
           { this.props.cars.map( c =>
               <li key={c.id}>{c.make} {c.model} {c.year}</li>
             )
           }
         </ol>
       )
     }
  }

  export default CarList;