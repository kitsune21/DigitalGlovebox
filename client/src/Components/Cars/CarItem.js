import React from 'react';
import CarForm from './CarForm';

const CarItem = ({car, deleteCar, updateCar, addItem}) => (
  <>
  <div>
    <p>{car.make} {car.model} {car.year} </p>
    <button onClick={() => deleteCar(car.id)}>Delete</button>
    <button onClick={() => updateCar(car.id)}>Edit</button>
    
  </div>
</>
)
export default CarItem;