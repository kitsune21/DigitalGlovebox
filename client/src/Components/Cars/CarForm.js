import React, { Component } from 'react';
import { Form, Button, Modal, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

class CarForm extends Component {
 state = { year: "", make: "", model: "", mileage: "", vin: "", modalOpen: false, loading: false }

 componentDidMount() {
   if (this.props.id) {
     this.setState({ year: this.props.car.year, make: this.props.car.make, model: this.props.car.model, mileage: this.props.car.mileage })
   }
 }

 handleChange = (e) => {
   const { name, value } = e.target
   this.setState({ [name]: value })
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
 }

 setCarInfo = (data) => {
  let carData = data.Results;
  carData.forEach( info => {
    if(info.Variable === "Make"){
      this.setState({make: info.Value})
    } 
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
   this.setState({loading: true})
  this.getCarInfo();
 }

 renderVINForm = () => {
   const { vin } = this.state;
  return(
    <Form onSubmit={this.getCarInfo}>
      <Form.Input
        placeholder='VIN'
        label='vin'
        name='vin'
        value={vin}
        onChange={this.handleChange}/>
      <Button onClick={this.handleClose}>Submit</Button>
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
   const { year, make, model, mileage, vin } = this.state
   return (
     <>
      <Modal 
        trigger={<Button onClick={this.handleOpen}>Add From VIN #</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          Car VIN #
        </Modal.Header>
        <Modal.Content>
          {!this.state.loading ? this.renderVINForm() : this.renderVINLoader()}
        </Modal.Content>
        </Modal>
        <Form onSubmit={this.handleSubmit}>

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
            label='model'
            name='model'
            value={model}
            onChange={this.handleChange}
            />

            <Form.Input
              required
              type='number'
            placeholder='Mileage'
            label='mileage'
            name='mileage'
            value={mileage}
            onChange={this.handleChange}
            />
            <Button type='submit'>Submit</Button>
          </Form>
      </>
    )
   }
  }

  export default CarForm; 