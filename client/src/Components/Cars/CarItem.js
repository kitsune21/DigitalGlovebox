import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import CarForm from './CarForm';

const CarItem = ({car, deleteCar}) => (
  <>
 <div>
   <p>{car.make} {car.model} {car.year} </p>
 </div>
 <>
  <button 
    icon
    color="red" 
    size="tiny"
    onClick={() => deleteCar(car.id)}
    style={{ marginLeft: "15px", }}
    >
    <Icon name="trash" />
   </button>
 </>
 </>
)

  

export default CarItem;