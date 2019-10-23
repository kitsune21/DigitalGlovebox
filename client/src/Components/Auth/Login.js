import React from 'react';
import { AuthConsumer, } from '../../Providers/AuthProvider';
import { Button, Form, Segment, Header, } from 'semantic-ui-react';
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

    const Wrapper = styled.section`
    width: 350px;
    height: 300px;
    position: relative;
    left: 35%;
    `;

    return (
     
      <Segment basic>
      <Header style={{color:'white'}} as='h1' textAlign='center'>Login</Header>
        <Wrapper>
        <Form inverted onSubmit={this.handleSubmit}>
          <Form.Input
            autoFocus
            label='email'
            required
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />

          <Form.Input
            required
            label='password'
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
        </Wrapper>
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
