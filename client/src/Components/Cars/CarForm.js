import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class CarForm extends Component {
 state = { year: "", make: "", model: "", mileage: "" }
 componentDidMount() {
   if (this.props.id) {
     this.setState({ name: this.props.name })
   }
 }

 handleChange = (e) => {
   const { name, value } = e.target
   this.setState({ [name]: value })
 }

 handleSubmit = (e) => {
   e.preventDefault();
   
   if (this.props.id) {
     this.props.update(this.props.id, this.state)
     this.props.toggleEdit()
   } else {
     this.props.add(this.state)
     this.props.toggleAdd()
   }
   this.setState({ name: '' })
 }

 render() {
   const { year, make, model, mileage } = this.state
   return (
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
    )
   }
  }

  export default CarForm; 