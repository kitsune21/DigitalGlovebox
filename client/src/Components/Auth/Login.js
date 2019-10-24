import React from 'react';
import { AuthConsumer, } from '../../Providers/AuthProvider';
import { Button, Form, Segment, Header, Card } from 'semantic-ui-react';
import styled from 'styled-components';

class Login extends React.Component {
  state = { email: '', password: '' }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, } = this.state;
    this.props.auth.handleLogin({ email, password, }, this.props.history);
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  render() { 
    const { email, password, } = this.state;

    return (
     
      <Segment style={{marginLeft: 275}} basic>
      <Header style={{color:'white'}} as='h3'>Login</Header>
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
          <Segment style={{marginLeft: 230}} basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
      
    )
  }
}

export default class ConnectedLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}
