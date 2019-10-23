import React from 'react';
import { AuthConsumer, } from '../../Providers/AuthProvider';
import { Button, Form, Segment, Header, } from 'semantic-ui-react';

class Register extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    const { auth: { handleRegister, }, history, } = this.props;

    if (password === passwordConfirmation)
      handleRegister({ email, password, passwordConfirmation, }, history);
    else
      alert('Passwords Do Not Match!')
  }
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }
  
  render() {
    const { email, password, passwordConfirmation, } = this.state;
    
    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
        <p color='white'>Email*</p>
          <Form.Input
            autoFocus
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />
          <p color='white'>Password*</p>
          <Form.Input
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <p color='white'>Confirm Password*</p>
          <Form.Input
            name='passwordConfirmation'
            value={passwordConfirmation}
            placeholder='Password Confirmation'
            type='password'
            onChange={this.handleChange}
          />
          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Register { ...this.props } auth={auth} /> }
      </AuthConsumer>
    )
  }
}
