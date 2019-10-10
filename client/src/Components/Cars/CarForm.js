import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class CarForm extends Component {
 state = { name: '' }
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
   }
   this.setState({ name: '' })
 }

 render() {
   const { name } = this.state
   return (
     <Form onSubmit={this.handleSubmit}>
       <Form.Input
         required
         placeholder='Car'
         label='name'
         name='name'
         value={name}
         onChange={this.handleChange}
       />
      </Form>
    )
   }
  }

  export default CarForm; 