import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class DocTypeForm extends Component {
  state = { name: '' }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ name: this.props.title })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props)
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
          placeholder='name'
          label='Add document type'
          name='name'
          value={name}
          onChange={this.handleChange}
        />
        <Form.Button color='green'>Submit</Form.Button>
      </Form>
    )
  }
}

export default DocTypeForm;
