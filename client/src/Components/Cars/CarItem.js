import React from 'react';
import CarForm from './CarForm';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';

const Title = styled.h1`
  font-size: 1.2em;
  text-align: center;
  color: #000000;
  font-family: arial;
`;
const Wrapper = styled.section`
border-radius:5px;
  background: #F8F8F8;
  margin: 0 auto;
  border: 3px 'green';
  width: 30%;
  height: 150px;
  position: relative;
`;



const CarItem = ({car, deleteCar, updateCar, toggleEditing, editing, toggleLoading}) => (
  <>
  { !editing ?
    <div width="100%">

      <Wrapper>
      <div>
  
      <Title>
      <p>{car.year} {car.make} {car.model}</p> 
      <br/>
      <p>Mileage: {car.mileage}  License Plate: {car.license_plate}</p>
      <Button style={{color:'red', float:'right'}} onClick={() => deleteCar(car.id)}><Icon name='trash'/></Button>
      <Button style={{color:'blue', float:'right'}} onClick={() => toggleEditing()}><Icon name='pencil'/></Button>
      </Title><br />
      </div>
     </Wrapper>

    </div>
  :
  <CarForm id={car.id} car={car} updateCar={updateCar} toggleLoading={toggleLoading} toggleEditing={toggleEditing}/>

}
</>
)

export default CarItem;
