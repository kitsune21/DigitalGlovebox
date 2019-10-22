import React from 'react';
import CarForm from './CarForm';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: #000000;
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
  display: flex;
  justify-content: center;
  padding: 3em;
  background: #F8F8F8;
  margin: 2em;
  border: 3px 'green';
  margin-right: 15em;
  margin-left: 15em;
`;

const Button = styled.button`
  background: white;
  margin: auto, 0;
  // text-align: center;
  color: black;
  font-size: 16px;
  :disabled {
    opacity: 0.4;
  }`;



const CarItem = ({car, deleteCar, updateCar, toggleEditing, editing, toggleLoading}) => (  
  <>
  { !editing ? 
    <div>
      
      <Wrapper>
      <div>
        <Title>
        <p>{car.make} {car.model} {car.year} </p>
        </Title><br />
       </div>
        <Button>
       < button onClick={() => deleteCar(car.id)}>Delete</button>
        </Button>
        <Button>
      < button onClick={() => toggleEditing()}>Edit</button>
      </Button>
     </Wrapper>

      {/* <button onClick={() => deleteCar(car.id)}>Delete</button>
      <button onClick={() => toggleEditing()}>Edit</button> */}
    </div>
  :
  <CarForm id={car.id} car={car} updateCar={updateCar} toggleLoading={toggleLoading} toggleEditing={toggleEditing}/>

}
</>
)

export default CarItem;