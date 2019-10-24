import React from 'react';
import CarForm from './CarForm';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const AppContainer = styled.div`
  background: #1C2226;
  color: #ffffff;
  font: #ffffff;
  `
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
  margin-bottom:2em;
  border: 3px 'green';
  width: 350px;
  height: 100px;
  position: relative;
`;

const CarContentWrap = styled.section`
position: relative;
left: 45%;
  margin-left: -50px;
`;


const Button = styled.button`
  background: white;
  margin: 5px;
  text-align: center;
  color: black;
  font-size: 16px;
  :disabled {
    opacity: 0.4;
  }`;



const CarItem = ({car, deleteCar, updateCar, toggleEditing, editing, toggleLoading}) => (
  <>
  { !editing ?
    <div width="100%">

      <Wrapper>
      <div>
      <Title>
      <p>{car.make} {car.model} {car.year} </p>
      </Title><br />
      </div>
      <CarContentWrap>
      < Button style={{color:'red'}} onClick={() => deleteCar(car.id)}><Icon name='trash'/></Button>
      <Button style={{color:'blue'}} onClick={() => toggleEditing()}><Icon name='pencil'/></Button>
      </CarContentWrap>

     </Wrapper>

    </div>
  :
  <CarForm id={car.id} car={car} updateCar={updateCar} toggleLoading={toggleLoading} toggleEditing={toggleEditing}/>

}
</>
)

export default CarItem;
