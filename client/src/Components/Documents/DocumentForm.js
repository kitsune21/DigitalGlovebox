import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

class DocumentForm extends Component {
 state = { name: '', doc_type_id: '' }

 componentDidMount() {
   if (this.props.id) {
     this.setState({ name: this.props.name, doc_type_id: this.props.doc_type_id })
   }
 }

 pullDocTypes = () => {
  const { auth: { user } } = this.props
  axios.get(`/api/users/1/document_types`)
    .then( res => {
      this.setState({document_types: res.data})
    })
  axios.get(`/api/users/${user.id}/document_types`)
    .then( res => {
    this.setState({document_types: [...this.state.document_types, res.data]})
    })
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
   const { name, doc_type_id } = this.state;
   return (
     <Form onSubmit={this.handleSubmit}>

       <Form.Input
         required
         placeholder='Name'
         label='name'
         name='name'
         value={name}
         onChange={this.handleChange}
        />

         <Form.Select
          required
          label='doc_type_id'
          name='doc_type_id'
          value={doc_type_id}
          options={this.state.options}
          onChange={this.handleChange}
         />
         <Button type='submit'>Submit</Button>
      </Form>
    )
   }
  }

  export default DocumentForm; 