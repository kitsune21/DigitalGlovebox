import React from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { AuthConsumer } from '../../Providers/AuthProvider';

class Navbar extends React.Component{
  render() {
    const { auth: { user, handleLogout, }, location, } = this.props;
    return (
      <div>
        <ul>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/documents'>Documents</Link></li>
          <li>Contact Us</li>
          {
            user ? <li><Link to='/profile'>{user.name}</Link><button onClick={ () => handleLogout(this.props.history) }>Logout</button></li> : <li><Link to='/login' >Login</Link></li>
          }
          
        </ul>
      </div>
    );
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);