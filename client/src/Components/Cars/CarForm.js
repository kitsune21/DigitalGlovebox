import React, { Component } from 'react';
import { Form, Button, Modal, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.section`
   width: 350px;
   height: 100%;
   position: relative;
   left: 36%;
   `;

class CarForm extends Component {
 state = { year: "", make: "", model: "", mileage: "", vin: "", modalOpen: false, loading: false, buttonActive: false }

 componentDidMount() {
   if (this.props.id) {
     console.log(this.props.car.license_plate)
     this.setState({ year: this.props.car.year, make: this.props.car.make, model: this.props.car.model, mileage: this.props.car.mileage, VIN: this.props.car.vin, license_plate: this.props.car.license_plate})
   }
 }

 handleChange = (e) => {
   const { name, value } = e.target
   this.setState({ [name]: value })
   if(this.state.vin.length >= 17) {
     this.setState({buttonActive: !this.state.buttonActive})
   }
 }

 handleSubmit = (e) => {
   e.preventDefault();
   
   if (this.props.id) {
     this.props.updateCar(this.props.id, this.state)
     this.props.toggleEditing()
     this.props.toggleLoading()
   } else {
     this.props.add(this.state)
     this.props.toggleAdd()
   }
   this.setState({ name: '' })
 }

 getCarInfo = () => {
   axios({
     method: 'get',
     url: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${this.state.vin}?format=json`,
     dataType: 'application/json',
     headers: ''
   })
    .then( res => {
      this.setCarInfo(res.data);
      this.setState({ modalOpen: false })
    })
    .catch( res => {
      this.setState({error: true})
    })
 }

 setCarInfo = (data) => {
  let carData = data.Results;
  console.log(data)
  carData.forEach( info => {
    switch(info.Variable) {
      case "Make":
        this.setState({make: info.Value})
        break;
      case "Model Year":
        this.setState({year: info.Value})
        break;
      case "Model":
        this.setState({model: info.Value})
        break; 
      default:
        break;
    }
  })
 }

 handleOpen = () => {
   this.setState({ modalOpen: true, loading: false })
 }

 handleClose = () => {
  if(this.state.vin.length === 17) {
    this.setState({loading: true})
    this.getCarInfo();
  } else {
    this.setState({vin: '', error: false, modalOpen: false })
  }
 }

 renderVINForm = () => {
   const { vin } = this.state;
  return(
    <Form onSubmit={this.getCarInfo}>
      {this.state.error ? <p>Invalid Vin</p> : null}
      <Form.Input
        placeholder='VIN'
        label='vin'
        name='vin'
        value={vin}
        onChange={this.handleChange}/>
      <Button disabled={!this.state.buttonActive} onClick={this.handleClose}>Submit</Button>
    </Form>
  )
 }

 renderVINLoader = () => {
  return(
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  )
 }

 render() {
   const { year, make, model, mileage, license_plate } = this.state
   return (
     <>
      {
        this.props.id ? null 
        :
        <Modal 
        trigger={<Button onClick={this.handleOpen}>Add By VIN #</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>
          Car VIN #
        </Modal.Header>
        <Modal.Content>
          {!this.state.loading ? this.renderVINForm() : this.renderVINLoader()}
        </Modal.Content>
        </Modal>
      }
       <Wrapper>

        <Form inverted onSubmit={this.handleSubmit}>
          <Button>Close</Button>
          <Form.Input
            required
            type='number'
            placeholder='Year'
            label='year'
            name='year'
            value={year}
            onChange={this.handleChange}
            />

            <Form.Input
              required
            placeholder='Make'
            label='make'
            name='make'
            value={make}
            onChange={this.handleChange}
            />

            <Form.Input
              required
            placeholder='Model'
            label='Model'
            name='model'
            value={model}
            onChange={this.handleChange}
            />

            <Form.Input
              required
              type='number'
              placeholder='Mileage'
              label='Mileage'
              name='mileage'
              value={mileage}
              onChange={this.handleChange}
            />

            <Form.Input
              placeholder='license_plate'
              label='License Plate'
              name='license_plate'
              value={license_plate}
              onChange={this.handleChange}
            />

            <Button type='submit'>Submit</Button>
          </Form>
          </Wrapper>
          </>
    )
   }
  }

  export default CarForm; 