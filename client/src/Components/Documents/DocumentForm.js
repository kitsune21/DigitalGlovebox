import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

class DocumentForm extends Component {
 state = { name: '', doc_type_id: '', document_types: [], user_document_types: [], doc_pages: [] }

 componentDidMount() {
   if (this.props.id) {
     this.setState({ name: this.props.name, doc_type_id: this.props.doc_type_id })
   }
   this.pullDocTypes();
 }


 pullDocTypes = () => {
  axios.get(`/api/users/1/document_types`)
    .then( res => {
      this.setState({document_types: res.data})
    })
  axios.get(`/api/users/${this.props.user_id}/document_types`)
    .then( res => {
      this.setState({user_document_types: res.data})
    })
 }

 handleChange = (e) => {
   const { name, value } = e.target
   this.setState({ [name]: value })
 }

 handleSelection = (e, data) => {
   this.setState({doc_type_id: data.value})
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

 setDocTypes = () => {
   let myTypes = [];
   const doc_types = this.state.document_types.concat(this.state.user_document_types);
   doc_types.forEach( type => {
     myTypes.push({key: type.id , text: type.name, value: type.id})
   })
   return myTypes;
 }

 renderForm = (name) => {
   return(
    <Form onSubmit={this.handleSubmit}>
      <h3>Add Document</h3>
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
      fluid
      label='Docoument Type'
      placeholder='Document Type'
      options={this.setDocTypes()}
      onChange={this.handleSelection}
      />
      <Button type='submit'>Submit</Button>
    </Form>
   )
 }

 render() {
   const { name } = this.state;
   return (
     <div>
        {this.renderForm(name)}
     </div>
    )
   }
  }

  export default DocumentForm; 