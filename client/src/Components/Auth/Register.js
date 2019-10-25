import React from 'react';
import { AuthConsumer, } from '../../Providers/AuthProvider';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

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
      <Segment style={{marginLeft: 275}} basic>
        <Header style={{color:'white'}} as='h3'>Register</Header>
        <Form inverted onSubmit={this.handleSubmit}>
          <Form.Input
            style={{width: 575}}
            label='email'
            required
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
            
          />
          <Form.Input
            style={{width: 575}}
            label='password'
            required
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Form.Input
            style={{width: 575}}
            label='confirm password'
            required
            name='passwordConfirmation'
            value={passwordConfirmation}
            placeholder='Password Confirmation'
            type='password'
            onChange={this.handleChange}
          />
          <Segment style={{marginLeft: 230}} basic>
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
