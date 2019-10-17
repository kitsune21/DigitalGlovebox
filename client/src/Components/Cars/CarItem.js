import React from 'react';
import CarForm from './CarForm';


const CarItem = ({car, deleteCar, updateCar, toggleEditing, editing, toggleLoading}) => (  
  <>
  { !editing ? 
    <div>
      <p>{car.make} {car.model} {car.year} </p>
      <button onClick={() => deleteCar(car.id)}>Delete</button>
      <button onClick={() => toggleEditing()}>Edit</button>
    </div>
  :
  <CarForm id={car.id} car={car} updateCar={updateCar} toggleLoading={toggleLoading} toggleEditing={toggleEditing}/>

}
</>
)

export default CarItem;